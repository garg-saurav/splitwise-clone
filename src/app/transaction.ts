export class Transaction {
    constructor(
        public group:string,
        public desc:string,
        public amount:number,
        public tag:string
    ){}
}
