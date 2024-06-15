import { Plus } from 'lucide-react'
import { Input } from './components/input'
import { Table } from './components/table'
import { useState } from 'react'
import useDebounce from './hooks/debounce'

export function App () {
    const [filter, setFilter] = useState('')
    const debouncedFilter = useDebounce(filter, 1000)

    return (
        <div className="py-10 px-2 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Encurtador de <i>links</i></h1>
                <small>Crie um código e redirecione para um link</small>
            </div>
            <main className="max-w-6xl mx-auto space-y-5">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold">Links</h1>
                    <button className="inline-flex items-center gap-1.5 text-xs bg-neutral-300 text-gray-800 font-medium rounded-full px-2 py-1 hover:bg-neutral-300/90">
                        <Plus className="size-3" />
                        Criar URL encurtada
                    </button>
                </div>


                <div className="flex items-center justify-between">
                    <Input
                        setFilter={setFilter}
                        filter={filter}
                    />
                </div>

                <Table
                    debouncedFilter={debouncedFilter}
                />
            </main>
        </div>
    )
}