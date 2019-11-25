export interface IAnswer{
    email : string,
    answer : string,
    upvote_count : number
}

export interface IFeed {
    ques_email : string,
    timestamp : Date,
    category : string,
    question: string,
    answer : Array<IAnswer>;
}
