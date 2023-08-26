import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'



//TODO: GET BY ID
export async function GET(req= Request, {params}: Params) {
    
    try {
        const noteById = await prisma.note.findFirst({
            where: {
                id: Number(params.id)
            }
        },)
        if( !noteById ){
            throw new Error("note not found")
        }
        return NextResponse.json({
            note_id: noteById
        }, {status:201})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                error: error
            },{status:404})
        }
    }
}




//TODO: PUT 
export async function PUT(req= Request, {params}: Params) {
    try {
        
        const {title, content} = await req.json();
        const updateNote = await prisma.note.update({
            where : {
                id: Number(params.id)
            },
            data:{
                title,
                content
            }
        },
      );
      
       if( !updateNote.id){
        return NextResponse.json({
            error: "note not found"
        },{status:404})
       }
        

      return NextResponse.json({
        updated_note: updateNote
      },{status:201})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                error: error
            },{status:404})
        }
    }
}



//TODO: DELETE
export async function DELETE(req= Request, {params}: Params) {
    
    try {
        const deletenote = await prisma.note.delete({
            where:{
                id: Number(params.id)
            }
        })
        if( !deletenote ){
            throw new Error("note not found")
        }
        return NextResponse.json({
            delete_id: deletenote
        }, {status:201})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                error: error
            },{status:404})
        }
    }
}