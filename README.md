# Letmeask-nlw-6


Aplicação desenvolvida durante evento nlw. Aplicação cujo objetivo é gerenciar perguntas feitas durante lives
* Aplicação possui página do admin que pode criar uma sala e distribuir o código para que espectadores possam acessar a sala e fazer perguntas
* Aplicação possui página do espectador que possibilita o mesmo enviar perguntas visualizadas na página de admin e na sua própria sala. 

* link do protótipo no figma https://www.figma.com/file/0irruXMYu6gWcqGXEgzKdf/Letmeask-Copy?node-id=0%3A1

## Tecnologias utilizadas
* Reactjs
* Typescript
* SASS
* sweetalert
* Firebase
  * firebase auth
  * realtime database

## Funcionalidades do react utilizadas
* Hooks
  * useContext
  * useEffect
  * useState
* react-router-dom

## Alterações particulares realizadas
* Utilização de biblioteca sweetalert2 para mostrar avisos https://sweetalert2.github.io/#download
* Modificação no fluxo da aplicação para direcionar cada usuário para página correspondente
* Adicionado quantidade de likes também na página do admin (para que o mesmo consiga ver quais perguntas são mais relevantes)
* Modificações no scss para input e textarea com relação ao outline (substituí a borda preta quando em foco para borda roxa 1px)


