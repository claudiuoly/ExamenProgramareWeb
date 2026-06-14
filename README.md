# Grile Programare Web — Angular (stil Moodle)

Aplicație simplă pentru exersarea celor **96 de grile** din `Toate Grilele.txt`, fără login.

## Caracteristici

- **6 teste** (~16 întrebări fiecare), amestecate aleator din **toate categoriile**
- **Ordinea întrebărilor și a răspunsurilor** este aleatoare la fiecare reamestecare
- Toate întrebările folosesc **checkbox** (fără indiciu vizual dacă e unul sau mai multe răspunsuri corecte)
- Feedback după trimitere (corect / incorect + variantele corecte evidențiate)
- Buton **Reamesteacă testele** — redistribuie aleator întrebările între Test 1–6
- După finalizarea tuturor testelor, un **refresh** al paginii reamesteacă automat

## Pornire

```bash
cd quiz-app
npm install
npm start
```

Deschide [http://localhost:4200](http://localhost:4200).

## Regenerare grile (dacă modifici fișierul sursă)

```bash
cd quiz-app
npm run parse-questions
```

## Structură

- `Toate Grilele.txt` / `Programare WEB.md` — sursa întrebărilor
- `scripts/parse-questions.mjs` — parser TXT → JSON
- `quiz-app/public/questions.json` — datele încărcate de aplicație
- `quiz-app/` — aplicația Angular

