// class.ts
export class Class {
    static lastId = 0;  // Variable estática para mantener el último id

    id: number;
    teacherId: number;
    description: string;
    type: string;
    category: string;
    location: { latitude: number; longitude: number } | null;
    direction: string;
    postalCode: string;
    province: string;
    duration: string;
    localidad: string;

    constructor(
        description: string,
        type: string,
        category: string,
        location: { latitude: number; longitude: number } | null,
        direction: string,
        postalCode: string,
        province: string,
        teacherId: number,
        duration: string,
        localidad: string
    ) {
        this.id = ++Class.lastId;  // Incrementar el id automáticamente
        this.description = description;
        this.type = type;
        this.category = category;
        this.location = location;
        this.direction = direction;
        this.postalCode = postalCode;
        this.province = province;
        this.teacherId = teacherId;
        this.duration = duration;
        this.localidad = localidad;
    }
}
