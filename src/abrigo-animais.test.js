import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  // Novos testes para a Regra 5 e 6:

  test("Uma pessoa não pode adotar mais de 3 animais (regra 5)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE",
      "RATO",
      "Rex,Mimi,Fofo,Zero,Bola,Loco"
    );

    // pessoa 1 teria condições de adotar todos, mas só pode levar 3
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista).toContain("Mimi - pessoa 1");
    expect(resultado.lista).toContain("Fofo - abrigo"); //Fofo não recebe os brinquedos na ordem que ele gosta brinquedos: ["BOLA", "RATO", "LASER"]
    expect(resultado.lista).toContain("Zero - pessoa 1");
    expect(resultado.lista).toContain("Bola - abrigo"); // excedeu limite
    expect(resultado.lista).toContain("Loco - abrigo"); // excedeu limite
    expect(resultado.lista.length).toBe(6);
    expect(resultado.erro).toBeFalsy();
  });

  test("Loco não se importa com a ordem dos seus brinquedos desde que tenha outro animal como companhia na mesma casa (regra 6)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE,BOLA,LASER", // brinquedos da pessoa 1
      "CAIXA,NOVELO", // brinquedos da pessoa 2
      "Loco,Mimi" // animais desejados
    );

    // Ambos vão para a pessoa 1
    expect(resultado.lista).toContain("Loco - pessoa 1");
    expect(resultado.lista).toContain("Mimi - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Loco sozinho precisa respeitar ordem dos brinquedos (regra 6)", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,SKATE",
      "SKATE,RATO",
      "Loco"
    );

    // pessoa 2 respeita ordem correta (SKATE,RATO não está em ordem), pessoa 1 não
    expect(resultado.lista).toContain("Loco - pessoa 2");
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });
});
