import fastify from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import { pg } from './lib/postgres'
import { PostgresError } from 'postgres'
import { redis } from './lib/redis'

const app = fastify()

app.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
})

app.get('/:code', async (req, reply) => {
    const codeSchema = z.object({
        code: z.string().min(3),
    })

    const { code } = codeSchema.parse(req.params)

    const queryResult = await pg/*sql*/`
        SELECT id, original_url
        FROM shortened_links
        WHERE shortened_links.code = ${code}
    `

    if (queryResult.length === 0) {
        return reply.status(400).send({
            message: 'Link not found.'
        })
    }

    const { id, original_url } = queryResult[0]

    await redis.zIncrBy('metrics', 1, String(id))

    return reply.redirect(301, original_url)
})

app.get('/api/links', async () => {
    const queryResult = await pg/*sql*/`
        SELECT *
        FROM shortened_links
        ORDER BY created_at DESC
    `

    return queryResult
})

app.post('/api/links', async (req, reply) => {
    const linkSchema = z.object({
        code: z.string().min(3),
        url: z.string().url(),
    })

    const { code, url } = linkSchema.parse(req.body)

    try {
        const insertionId = await pg/*sql */`
            INSERT INTO shortened_links (code, original_url)
            VALUES (${code}, ${url})
            RETURNING id
        `

        const { id } = insertionId[0]

        return reply.status(201).send({ shortenedLinkId: id })
    } catch (error) {
        if (error instanceof PostgresError) {
            if (error.code === "23505") {
                return reply.status(400).send({
                    message: 'Duplicated code.'
                })
            }
        }
        return reply.status(500).send({
            message: 'Internal server error'
        })
    }
})

app.get('/api/metrics', async () => {
    const result = await redis.zRangeByScoreWithScores('metrics', 0, 50)

    const metrics = result
        .sort((x, y) => y.score - x.score)
        .map(item => {
            return {
                shortenedLinkId: Number(item.value),
                accesses: item.score
            }
        })

    return metrics
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server running')
})