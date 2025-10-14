import TableDetails from './TableDetails';


interface TableDetailsProps {
    params: { id: string };
}

export default function Page({ params }: { params: { id: string } }) {
    return <TableDetails id={params.id} />
}
