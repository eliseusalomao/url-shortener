import { useQuery } from "@tanstack/react-query"

interface Tag {
    id: string
    code: string
    original_url: string
}[]

type Props = {
    debouncedFilter: string
}

export function Table ({ debouncedFilter }: Props) {
    const { data: linksResponse, isLoading } = useQuery<Tag[]>({
        queryKey: ['get-links', debouncedFilter],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/api/links')
            const data = await response.json()
            return data
        },
    })

    if (isLoading) {
        return null
    }

    const links = linksResponse?.filter(link => link.code.includes(debouncedFilter))

    return (
        <table className="w-full text-sm border-t-2 border-b-2 border-slate-950">
            <thead>
                <tr className="border-b border-teal-950">
                    <th className="text-left py-3 px-4 font-medium">Link encurtado</th>
                    <th className="text-left py-3 px-4 font-medium">Link original</th>
                </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 [&_tr:hover]:bg-zinc-800/50">
                {links?.map((tag) => {
                    return (
                        <tr key={tag.id}>
                            <td className="font-m edium py-3 px-4">{tag.code}</td>
                            <td className="font-medium py-3 px-4"><span className="text-xs text-zinc-400">{tag.original_url}</span></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}