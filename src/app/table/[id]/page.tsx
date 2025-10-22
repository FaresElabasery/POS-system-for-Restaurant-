import TableDetails from './TableDetails';




export default function Page({ params }: { params: { id: string } }) {
    return <TableDetails id={params.id} />
}
