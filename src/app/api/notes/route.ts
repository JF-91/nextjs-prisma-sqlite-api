import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'

//TODO: GET ALL
export async function GET() {
    
    try {
        const notes = await prisma.note.findMany()
        if(notes){
            return NextResponse.json({
                notes: notes
            },{status:201})
        }
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                error: error
            },{status:404})
        }
    }
}




//TODO: POST CREATE
export async function POST(req=Request) {

    try {
        const {title, content} = await req.json();
        
        const newNote = await prisma.note.create({
            data: {
                title,
                content
            }
        }) 

        return NextResponse.json({
            new_post: newNote
        }, {status:200})
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                error: error
            },{status:500})
        }
    }
}