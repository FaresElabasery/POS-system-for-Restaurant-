import TableDetails from './TableDetails';


interface TableDetailsProps {
    params: { id: string };
}

export default function Page({ params }: TableDetailsProps) {

    return <TableDetails id={params.id} />
}
