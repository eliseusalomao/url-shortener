export function Table () {
    return (
        <table className="w-full text-sm border-t-2 border-b-2 border-slate-950">
            <tr className="border-b border-teal-950">
                <th className="text-left py-3 px-4 font-medium">Link encurtado</th>
                <th className="text-left py-3 px-4 font-medium">Link original</th>
            </tr>
            <tbody className="[&_tr:last-child]:border-0 [&_tr:hover]:bg-zinc-800/50">
                {Array.from({ length: 10 }).map((_, idx) => {
                    return (
                        <tr key={idx}>
                            <td className="font-medium py-3 px-4">Wikipedia</td>
                            <td className="font-medium py-3 px-4"><span className="text-xs text-zinc-400">https://www.wikipedia.org/</span></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}