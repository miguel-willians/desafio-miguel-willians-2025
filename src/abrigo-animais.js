class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pets = [
      { nome: "Rex", tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      { nome: "Mimi", tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      { nome: "Fofo", tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      { nome: "Zero", tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      { nome: "Bola", tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      { nome: "Bebe", tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      { nome: "Loco", tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    ];

    const brinquedosPessoa1Arr = brinquedosPessoa1.split(",");
    const brinquedosPessoa2Arr = brinquedosPessoa2.split(",");

    const ordemAnimaisArr = ordemAnimais.split(",");

    const pessoas = ["pessoa 1", "pessoa 2"];

    let resultado = [];

    function satisfazAnimal(
      brinquedosAnimal,
      nomeAnimal,
      brinquedosPessoa,
      pessoa
    ) {
      const locoTemCompanhia =
        nomeAnimal === "Loco" && resultado.some((r) => r.endsWith(pessoa));

      if (locoTemCompanhia) {
        return brinquedosAnimal.every((brinquedo) =>
          brinquedosPessoa.includes(brinquedo)
        );
      }

      let posPessoa = 0;
      // Compara se a pessoa dá o brinquedo na ordem que o animal deseja
      for (const brinquedo of brinquedosAnimal) {
        let encontrado = false;
        while (posPessoa < brinquedosPessoa.length) {
          if (brinquedosPessoa[posPessoa] === brinquedo) {
            encontrado = true;
            posPessoa++;
            break;
          }
          posPessoa++;
        }
        if (!encontrado) {
          return false;
        }
      }
      return true;
    }

    // 1. Checar se o ordemAnimais tem o pet desejado
    const animaisSelecionados = ordemAnimaisArr
      .map((nome) => pets.find((pet) => pet.nome === nome))
      .filter((animal) => animal);

    // 2. checa se há pelo menos um animal selecionável:
    if (animaisSelecionados.length === 0) {
      return { erro: "Animal inválido" };
    }

    // Tiro o loco  da seleção e insiro no final da lista para ser o último animal a ser verificado
    if (animaisSelecionados.some((animal) => animal.nome === "Loco")) {
      const [loco] = animaisSelecionados.splice(
        animaisSelecionados.findIndex((animal) => animal.nome === "Loco"),
        1
      );
      animaisSelecionados.push(loco);
    }

    // Separar gatos dos animais selecionados:
    const gatos = animaisSelecionados.filter(
      (animal) => animal.tipo === "gato"
    );

    // Verificar se há gatos
    if (gatos.length > 0) {
      for (const gato of gatos) {
        // Verificar conflito apenas contra animais já adotados
        const conflito = resultado.some((saida) => {
          const [nomeAnimal, destino] = saida.split(" - ");
          if (destino === "abrigo") return false;
          const animalConflitante = animaisSelecionados.find(
            (a) => a.nome === nomeAnimal
          );
          // Verificar se há pelo menos um brinquedo do gato seja igual a do outro animal
          return animalConflitante.brinquedos.some((brinquedo) =>
            gato.brinquedos.includes(brinquedo)
          );
        });

        if (conflito) {
          resultado.push(`${gato.nome} - abrigo`);
          // remove o gato da lista para não ser processado depois
          animaisSelecionados.splice(
            animaisSelecionados.findIndex((a) => a.nome === gato.nome),
            1
          );
        }
      }
    }

    // 3. Checa se as pessoas satisfazem o desejo dos animais:
    animaisSelecionados.forEach((animal) => {
      const pessoa1Satisfaz = satisfazAnimal(
        animal.brinquedos,
        animal.nome,
        brinquedosPessoa1Arr,
        pessoas[0]
      );
      const pessoa2Satisfaz = satisfazAnimal(
        animal.brinquedos,
        animal.nome,
        brinquedosPessoa2Arr,
        pessoas[1]
      );

      if (
        (pessoa1Satisfaz && pessoa2Satisfaz) ||
        (!pessoa1Satisfaz && !pessoa2Satisfaz)
      ) {
        resultado.push(`${animal.nome} - abrigo`);
      } else if (pessoa1Satisfaz && !pessoa2Satisfaz) {
        const adotadosPessoa1 = resultado.filter((saida) =>
          saida.endsWith(pessoas[0])
        );
        if (adotadosPessoa1.length === 3) {
          resultado.push(`${animal.nome} - abrigo`);
        } else resultado.push(`${animal.nome} - ${pessoas[0]}`);
      } else if (!pessoa1Satisfaz && pessoa2Satisfaz) {
        const adotadosPessoa2 = resultado.filter((saida) =>
          saida.endsWith(pessoas[1])
        );
        if (adotadosPessoa2.length === 3) {
          resultado.push(`${animal.nome} - abrigo`);
        } else resultado.push(`${animal.nome} - ${pessoas[1]}`);
      }
    });
    resultado.sort();
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
