export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date; //? => means nullable so value is optional
    state?: 'completed' | 'cancelled' | null;
}