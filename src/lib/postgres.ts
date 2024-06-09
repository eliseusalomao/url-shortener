import postgres from 'postgres'

export const pg = postgres('postgresql://docker:docker@localhost:5436/shortenedlinks')
