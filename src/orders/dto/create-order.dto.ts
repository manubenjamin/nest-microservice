export class CreateOrderDto {
    readonly userId: string;
    readonly items: string[];
    readonly total: number;
}