export class Transaction {
    constructor(
        public involved:string,
        public desc:string,
        public amount:number,
        public tag:string
    ){}
}
