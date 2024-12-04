# **Exam API**

Una API para gestionar exámenes, preguntas, intentos y respuestas utilizando Node.js, TypeScript, Express y TypeORM con SQLite.

---

## **Requisitos Previos**

Asegúrate de tener instalados los siguientes programas:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (solo si usas Linx, ya que viene instalado por defecto en
  docker desktop app de windows/mac )


---

## **Cómo ejecutar el proyecto**

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tomassueldo/node-exams.git
   cd node-exams
   ```

2. **Levanta el entorno Docker:**
   ```bash
   docker-compose up --build -d
   ```

3. La API estará disponible en `http://localhost:3000`.

---

## **Endpoints Disponibles**

### **1. Crear un usuario**
- **Método:** `POST`
- **Ruta:** `/users`

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

---

### **2. Crear un examen**
- **Método:** `POST`
- **Ruta:** `/exams`

**Request Body:**
```json
{
  "title": "Historia",
  "questions": [
    {
      "text": "¿Quién descubrió América?",
      "type": "multiple_choice",
      "options": ["Cristóbal Colón", "Américo Vespucio"]
    },
    {
      "text": "La Revolución Francesa ocurrió en 1789.",
      "type": "true_false"
    }
  ]
}
```

**Response:**
```json
{
  "exam": {
    "id": 1,
    "title": "Historia"
  },
  "questions": [
    {
      "id": 1,
      "text": "¿Quién descubrió América?",
      "type": "multiple_choice",
      "options": "[\"Cristóbal Colón\", \"Américo Vespucio\"]"
    },
    {
      "id": 2,
      "text": "La Revolución Francesa ocurrió en 1789.",
      "type": "true_false",
      "options": null
    }
  ]
}
```

---

### **3. Obtener exámenes**
- **Método:** `GET`
- **Ruta:** `/exams`

**Response:**
```json
[
  {
    "id": 1,
    "title": "Historia",
    "questions": [
      {
        "id": 1,
        "text": "¿Quién descubrió América?",
        "type": "multiple_choice",
        "options": "[\"Cristóbal Colón\", \"Américo Vespucio\"]"
      },
      {
        "id": 2,
        "text": "La Revolución Francesa ocurrió en 1789.",
        "type": "true_false",
        "options": null
      }
    ]
  }
]
```

---

### **4. Iniciar un intento de examen**
- **Método:** `POST`
- **Ruta:** `/exam-attempts/:examId/start`

**Request Body:**
```json
{
  "userId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "exam": {
    "id": 1,
    "title": "Historia"
  },
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  },
  "startTime": "2024-12-03T12:00:00.000Z"
}
```

---

### **5. Finalizar un examen**
- **Método:** `POST`
- **Ruta:** `/exams/:id/finish`

**Request Body:**
```json
{
  "attemptId": 1
}
```

**Response:**
```json
{
  "message": "Exam finished successfully",
  "attempt": {
    "id": 1,
    "completed": true
  }
}
```

---

### **6. Obtener resultados del examen**
- **Método:** `GET`
- **Ruta:** `/exams/:id/results?userId={id}`

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  },
  "exam": "Historia",
  "answers": [
    {
      "question": "¿Quién descubrió América?",
      "userAnswer": "Cristóbal Colón"
    }
  ],
  "completed": true
}
```


---

## **Notas Adicionales**

- Adjunto una coleccion de postman para que sea mas facil poder probar la api, *exam-api.postman_collection.json*
