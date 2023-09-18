import TweetGuardado from "../../components/tweet/TweetGuardado";

const Saved = () => {
  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold my-5 text-center">Guardados</h2>
      {/* Lista de tweets guardados */}
      <div className="bg-white p-6 gap-2">
        {/* Ejemplo de tweet guardado */}
        <TweetGuardado
          user={"Nombre Apellido"}
          username={"@username"}
          tweetId={1}
          userId={1}
          content="Esto es un twit"
        />
        <TweetGuardado
          user={"Nombre Apellido"}
          username={"@username"}
          tweetId={1}
          userId={1}
          content="Esto es un twit"
        />
        <TweetGuardado
          user={"Nombre Apellido"}
          username={"@username"}
          tweetId={1}
          userId={1}
          content="Esto es un twit muy largo para ver como funciona el responsivo de los tweets"
        />
      </div>
    </div>
  );
};

export default Saved;
