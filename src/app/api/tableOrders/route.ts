// function GET(req) {

//     const { tableId } = req.query;

//      if (!tableId) {
//         return NextResponse.json({ error: 'Table ID is required' }, { status: 400 });
//     }

//     const checkTable = await prisma.table.findUnique({
//         where:{
//             id:tableID
//         }
//     })

//     if(checkTable){
//         response
//     }



// }