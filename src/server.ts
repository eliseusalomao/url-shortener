import fastify from 'fastify'
import { z } from 'zod'
import { pg } from './lib/postgres'
import { PostgresError } from 'postgres'

const app = fastify()

app.post('/links', async (req, reply) => {
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

        const link = insertionId[0]

        return reply.status(201).send({ shortenedLinkId: link.id })
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

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server running')
})