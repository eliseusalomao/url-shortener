import { Search } from "lucide-react";

type Props = {
    setFilter: React.Dispatch<React.SetStateAction<string>>
    filter: string
}

export function Input ({ setFilter, filter }: Props) {
    return (
        <div className="flex flex-row-reverse gap-2 items-center p-2 border-2 rounded-full border-slate-950">
            <input
                className="text-xs bg-transparent outline-none"
                type="text" placeholder="Procurar por link"
                onChange={e => setFilter(e.target.value)}
                value={filter}
            />
            <Search className="size-3" />
        </div>
    )
}