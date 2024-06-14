import { Search } from "lucide-react";

export function Input () {
    return (
        <div className="flex flex-row-reverse gap-2 items-center p-2 border-2 rounded-full border-slate-950">
            <input className="text-xs bg-transparent outline-none" type="text" placeholder="Procurar por link" />
            <Search className="size-3" />
        </div>
    )
}