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

    function satisfazAnimal(brinquedosAnimal, brinquedosPessoa) {
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
        return true;
      }
    }

    let resultado = [];

    // 1. Checar se o ordemAnimais tem o pet desejado
    for (const animal of ordemAnimaisArr) {
      const animaisSelecionados = pets.filter((pet) => pet.nome === animal);

      // 2. checa se há pelo menos um animal selecionável:
      if (animaisSelecionados.length === 0) {
        return { erro: "Animal inválido" };
      }

      // 3. Checa se as pessoas satisfazem o desejo dos animais:
      animaisSelecionados.forEach((animal) => {
        const pessoa1Satisfaz = satisfazAnimal(
          animal.brinquedos,
          brinquedosPessoa1Arr
        );
        const pessoa2Satisfaz = satisfazAnimal(
          animal.brinquedos,
          brinquedosPessoa2Arr
        );

        if (
          (pessoa1Satisfaz && pessoa2Satisfaz) ||
          (!pessoa1Satisfaz && !pessoa2Satisfaz)
        ) {
          resultado.push(`${animal.nome} - abrigo`);
        } else if (pessoa1Satisfaz && !pessoa2Satisfaz) {
          resultado.push(`${animal.nome} - pessoa 1`);
        } else if (!pessoa1Satisfaz && pessoa2Satisfaz) {
          resultado.push(`${animal.nome} - pessoa 2`);
        }
      });
    }

    resultado.sort();
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
