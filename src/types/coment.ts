import Answers from "./answers"
import Favorite from "./favorite"

type Comment = {
                    
    rate: number

    rated: []

    answers: Answers[]

    favorite: Favorite[]

    date: string

    time: string

    text: string
        
}

export default Comment