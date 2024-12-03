# Prueba Técnica HOKALI Backend: 

## API de Preguntas y Respuestas con Exámenes

## Objetivo

Diseñar e implementar una API backend en **Node.js** y **TypeScript** para gestionar un sistema de preguntas y respuestas en un contexto de exámenes. Los usuarios deben responder preguntas asociadas a un examen dentro de un tiempo límite (1 hora) y solo pueden completar un examen una vez.

---

## Requisitos Funcionales

### Diseño del Modelo

#### Entidades principales:
- **Usuario (`User`)**:
  - Representa a los usuarios registrados en el sistema.
  
- **Pregunta (`Question`)**:
  - Texto de la pregunta.
  - Tipo (`type`): puede ser `text`, `true_false`, `multiple_choice`.
  - Opciones: solo aplicable a preguntas de tipo `multiple_choice`.

- **Examen (`Exam`)**:
  - Contiene un conjunto de preguntas.
  - Relación con usuarios.

- **Respuesta (`Answer`)**:
  - Relación con el usuario.
  - Relación con la pregunta.
  - Relación con el examen.
  - Respuesta proporcionada por el usuario.
  - Timestamp de la respuesta.

- **Intento de Examen (`ExamAttempt`)**:
  - Usuario relacionado.
  - Examen relacionado.
  - Timestamp de inicio.
  - Tiempo máximo de respuesta: 1 hora desde el inicio.

### Restricciones
1. Un usuario puede **completar un examen solo una vez**.
2. Todas las preguntas del examen deben ser respondidas dentro del límite de 1 hora.
3. Si el tiempo límite expira, el examen no puede ser completado.

---

## API REST

### Endpoints

#### Registro de usuarios:
**POST /users**
```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}

```

### Crear un examen

**POST** `/exams`

```json
{
  "title": "Examen de Historia",
  "questions": [
    {
      "text": "¿Quién descubrió América?",
      "type": "multiple_choice",
      "options": ["Cristóbal Colón", "Américo Vespucio", "Fernando de Magallanes", "Hernán Cortés"]
    },
    {
      "text": "La Revolución Francesa ocurrió en 1789.",
      "type": "true_false"
    }
  ]
}
```

### Iniciar un examen:
**POST** `/exams/:id/start`

```json
{
  "title": "Examen de Historia",
  "questions": [
    {
      "text": "¿Quién descubrió América?",
      "type": "multiple_choice",
      "options": ["Cristóbal Colón", "Américo Vespucio", "Fernando de Magallanes", "Hernán Cortés"]
    },
    {
      "text": "La Revolución Francesa ocurrió en 1789.",
      "type": "true_false"
    }
  ]
}
```

### Respuesta

Incluye el ID del intento y la hora de inicio.

---

### Responder una pregunta

**POST** `/exams/:examId/questions/:questionId/answer`
```json
 {
  "attemptId": 1,
  "answer": "Cristóbal Colón"
}
```

### Validar

- Si el tiempo límite de 1 hora no ha expirado.
- Si el usuario ya completó el examen.

---

### Finalizar el examen

**POST** `/exams/:id/finish`
```json
  {
  "attemptId": 1
}
```

### Validar

- Si todas las preguntas han sido respondidas dentro del tiempo límite.
- Registra el examen como completado.

---

### Obtener resultados del examen

**GET** `/exams/:id/results?userId=1`

Retorna las respuestas del usuario y el estado del examen.

### Persistencia

#### Base de Datos
Usar **SQLite** como base de datos para almacenar la información. Las tablas deben incluir:

- **Users**:
  - id, name, email.

- **Exams**:
  - id, title.

- **Questions**:
  - id, examId, text, type, options.

- **Answers**:
  - id, attemptId, questionId, answer, createdAt.

- **ExamAttempts**:
  - id, examId, userId, startTime.

#### ORM
Utilizar **TypeORM** o **Prisma** para gestionar la base de datos.

---

### Criterios de Evaluación

#### Modelo de Datos:
- Representación adecuada de las relaciones entre usuarios, exámenes, preguntas, respuestas e intentos.

#### Funcionalidad:
- Cumplimiento de restricciones (una respuesta por examen, límite de tiempo de 1 hora).
- Manejo correcto de errores.

#### Calidad del Código:
- Organización del proyecto.
- Uso efectivo de **TypeScript** (tipado, interfaces, clases).

#### Documentación:
- Instrucciones claras para ejecutar la aplicación.
- Ejemplos de uso de los endpoints.

---

### Instrucciones para Entrega

#### Código Fuente:
- Subir el código a un repositorio en GitHub/GitLab o enviarlo comprimido en un archivo.

#### Diagrama de Clases:
- Adjuntar una imagen o archivo PDF con el diseño del modelo.

#### Archivo README:
Incluir:
- Cómo ejecutar el proyecto.
- Ejemplos de endpoints.
