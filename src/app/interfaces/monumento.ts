export interface Monumento {
    id?: string
    titulo?: string    
    autores?: string[]
    anio?: number    
    lugar?: string    
	imagenes?: any		
    estado?: boolean
    fechaRegistro?: Date
    fechaModificacion?: Date
}
