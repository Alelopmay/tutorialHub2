// petition.model.ts
export class Petition {
    id: number;
    message: string;
    state: boolean | null;
    date: Date;
    userId: number;
    classId: number;
    classInfo: string[] = [];  // Información de la clase
    expanded: boolean | undefined;

    constructor(
        id: number,
        message: string,
        state: boolean | null,
        date: Date,
        userId: number,
        classId: number
    ) {
        this.id = id;
        this.message = message;
        this.state = state;
        this.date = date;
        this.userId = userId;
        this.classId = classId;
    }
}
