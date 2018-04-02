(function () {
    var app = angular.module('GamePokemon', []);

    app.controller('GameController', function ($scope) {

        $scope.init = function () {
            $scope.meusPokemons = [];
            $scope.oponentePokemons = [];
            instanciarPokemons();
            definirJogadorInicial();
        };

        function definirJogadorInicial() {
            $scope.suaVez = Math.random() >= 0.5;

            getMensagemJogadorDaVez();
            if (!$scope.suaVez) {
                escolherMaquina();
            }
        }

        function getMensagemJogadorDaVez() {
            if ($scope.suaVez) {
                $scope.mensagem = "Sua vez";
            } else {
                $scope.mensagem = "Vez do oponente";
            }
        }

        function Pokemon(id, forca, tipo, vantagens, imagem) {
            this.id = id;
            this.forca = forca;
            this.tipo = tipo;
            this.vantagens = vantagens;
            this.imagem = imagem;
            this.escolhido = false;
        }

        function instanciarPokemons() {
            $scope.pokemons = [];
            $scope.pokemons.push(new Pokemon(1, 3, "Água", [3, 4, 7], "http://1.bp.blogspot.com/-zIuxbXqYiLc/TWBv2t7E_UI/AAAAAAAAAzU/Hh-zagXyRB4/s1600/Ins%25C3%25ADgnia%2BCascata.gif"));
            $scope.pokemons.push(new Pokemon(2, 3, "Planta", [1, 6, 8], "http://4.bp.blogspot.com/-xAxHlN4k6xs/TWBweGw9auI/AAAAAAAAA2s/fd2H7ASGPnk/s1600/Ins%25C3%25ADgnia%2BTerra.gif"));
            $scope.pokemons.push(new Pokemon(3, 3, "Fogo", [2, 5, 9], "http://2.bp.blogspot.com/--mUEOkG6fb4/TWBtqCbDqXI/AAAAAAAAAzE/ddTftLsAwDY/s1600/Ins%25C3%25ADgnia%2BCalor.gif"));
            $scope.pokemons.push(new Pokemon(4, 6, "Lutador", [5, 8], "http://3.bp.blogspot.com/-Dzlh_vB4VF8/TWBwdifq7QI/AAAAAAAAA2k/fq3suF5jl4A/s1600/Ins%25C3%25ADgnia%2BTempestade.gif"));
            $scope.pokemons.push(new Pokemon(5, 6, "Eletrico", [6, 9], "http://4.bp.blogspot.com/-F8Eq01Bjaew/Th8Yb_yXNNI/AAAAAAAADaY/ebSBsOEynkA/s1600/unova4.png"));
            $scope.pokemons.push(new Pokemon(6, 6, "Psico", [4, 7], "http://cdn.bulbagarden.net/upload/1/13/Psychic_Badge.png"));
            $scope.pokemons.push(new Pokemon(7, 9, "Pedra", [9], "https://3.bp.blogspot.com/-7-bF3tHEyzY/TWBwTQLXvKI/AAAAAAAAA10/0Z3tVDH9T7M/s320/Ins%25C3%25ADgnia%2BPedra.gif"));
            $scope.pokemons.push(new Pokemon(8, 9, "Ar", [7], "https://3.bp.blogspot.com/-wVyVmuP_TBY/TWBwjJeoDHI/AAAAAAAAA3E/rmPbTuyGPS4/s320/Ins%25C3%25ADgnia%2BZephir.gif"));
            $scope.pokemons.push(new Pokemon(9, 9, "Gelo", [8], "https://1.bp.blogspot.com/-5NVdA9T9S8c/TWBwFImSG9I/AAAAAAAAA0k/DICO1Dad7tc/s320/Ins%25C3%25ADgnia%2BGlacial.gif"));
        }

        function getPokemonsDisponiveis() {
            var pokemonsNaoEscolhidos = [];
            $scope.pokemons.forEach(function (pokemon) {
                if (!pokemon.escolhido) {
                    pokemonsNaoEscolhidos.push(pokemon);
                }
            });
            return pokemonsNaoEscolhidos;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function trocarVezJogador() {
            $scope.suaVez = !$scope.suaVez;
            getMensagemJogadorDaVez();
        }

        function escolherMaquina() {
            if ($scope.oponentePokemons.length < 3) {
                var pokemonsDisponiveis = getPokemonsDisponiveis();
                var indexPokemonRandon = getRandomInt(0, pokemonsDisponiveis.length);
                var pokemonEscolhido = pokemonsDisponiveis[indexPokemonRandon];
                setarJogadaPokemon($scope.oponentePokemons, pokemonEscolhido);
            }

            trocarVezJogador();
            verificarVencedor();
        }

        function setarJogadaPokemon(pokemons, pokemonEscolhido) {
            pokemonEscolhido.escolhido = true;
            pokemons.push(pokemonEscolhido);
        }

        function verificarVencedor() {
            if ($scope.meusPokemons.length === 3 && $scope.oponentePokemons.length === 3) {
                var forcaMeusPokemons = getForcaPokemons($scope.meusPokemons, $scope.oponentePokemons);
                var forcaOponentePokemons = getForcaPokemons($scope.oponentePokemons, $scope.meusPokemons);

                if (forcaMeusPokemons > forcaOponentePokemons) {
                    $scope.mensagem = "Você ganhou";
                } else if (forcaOponentePokemons > forcaMeusPokemons) {
                    $scope.mensagem = "Você perdeu";
                } else {
                    $scope.mensagem = "Aconteceu empate";
                }
            }
        }

        function getForcaPokemons(pokemons, pokemonsAdversario) {
            var forcaTotal = 0;

            pokemons.forEach(function (pokemon) {
                forcaTotal += pokemon.forca;
                forcaTotal += getForcaPokemonComVantagem(pokemon, pokemonsAdversario);
            });

            return forcaTotal
        }

        function getForcaPokemonComVantagem(pokemon, pokemonsContra) {
            var forcaVantagem = 0;
            pokemonsContra.forEach(function (pokemonContra) {
                if (pokemon.vantagens.includes(pokemonContra.id)) {
                    forcaVantagem += 4;
                }
            });

            return forcaVantagem;
        }

        $scope.escolher = function (pokemon) {
            if ($scope.suaVez && !pokemon.escolhido) {
                if ($scope.meusPokemons.length < 3) {
                    setarJogadaPokemon($scope.meusPokemons, pokemon);
                } else {
                    $scope.mensagemQtdPokemons = "Você já escolhe 3 Pokemons";
                }

                trocarVezJogador();
                escolherMaquina();
                verificarVencedor();
            }
        };

        $scope.init();

    });

    app.controller('GameMiniMaxController', function ($scope) {

        $scope.init = function () {
            $scope.meusPokemons = [];
            $scope.oponentePokemons = [];
            instanciarPokemons();
            definirJogadorInicial();
        };

        function definirJogadorInicial() {
            $scope.suaVez = false;

            getMensagemJogadorDaVez();
            if (!$scope.suaVez) {
                escolherMaquina();
            }
        }

        function getMensagemJogadorDaVez() {
            if ($scope.suaVez) {
                $scope.mensagem = "Sua vez";
            } else {
                $scope.mensagem = "Vez do oponente";
            }
        }

        function Pokemon(id, forca, tipo, vantagens, imagem) {
            this.id = id;
            this.forca = forca;
            this.tipo = tipo;
            this.vantagens = vantagens;
            this.imagem = imagem;
            this.escolhido = false;
        }

        function instanciarPokemons() {
            $scope.pokemons = [];
            $scope.pokemons.push(new Pokemon(1, 3, "Água", [3, 4, 7], "http://1.bp.blogspot.com/-zIuxbXqYiLc/TWBv2t7E_UI/AAAAAAAAAzU/Hh-zagXyRB4/s1600/Ins%25C3%25ADgnia%2BCascata.gif"));
            $scope.pokemons.push(new Pokemon(2, 3, "Planta", [1, 6, 8], "http://4.bp.blogspot.com/-xAxHlN4k6xs/TWBweGw9auI/AAAAAAAAA2s/fd2H7ASGPnk/s1600/Ins%25C3%25ADgnia%2BTerra.gif"));
            $scope.pokemons.push(new Pokemon(3, 3, "Fogo", [2, 5, 9], "http://2.bp.blogspot.com/--mUEOkG6fb4/TWBtqCbDqXI/AAAAAAAAAzE/ddTftLsAwDY/s1600/Ins%25C3%25ADgnia%2BCalor.gif"));
            $scope.pokemons.push(new Pokemon(4, 6, "Lutador", [5, 8], "http://3.bp.blogspot.com/-Dzlh_vB4VF8/TWBwdifq7QI/AAAAAAAAA2k/fq3suF5jl4A/s1600/Ins%25C3%25ADgnia%2BTempestade.gif"));
            $scope.pokemons.push(new Pokemon(5, 6, "Eletrico", [6, 9], "http://4.bp.blogspot.com/-F8Eq01Bjaew/Th8Yb_yXNNI/AAAAAAAADaY/ebSBsOEynkA/s1600/unova4.png"));
            $scope.pokemons.push(new Pokemon(6, 6, "Psico", [4, 7], "http://cdn.bulbagarden.net/upload/1/13/Psychic_Badge.png"));
            $scope.pokemons.push(new Pokemon(7, 9, "Pedra", [9], "https://3.bp.blogspot.com/-7-bF3tHEyzY/TWBwTQLXvKI/AAAAAAAAA10/0Z3tVDH9T7M/s320/Ins%25C3%25ADgnia%2BPedra.gif"));
            $scope.pokemons.push(new Pokemon(8, 9, "Ar", [7], "https://3.bp.blogspot.com/-wVyVmuP_TBY/TWBwjJeoDHI/AAAAAAAAA3E/rmPbTuyGPS4/s320/Ins%25C3%25ADgnia%2BZephir.gif"));
            $scope.pokemons.push(new Pokemon(9, 9, "Gelo", [8], "https://1.bp.blogspot.com/-5NVdA9T9S8c/TWBwFImSG9I/AAAAAAAAA0k/DICO1Dad7tc/s320/Ins%25C3%25ADgnia%2BGlacial.gif"));
        }

        function getPokemonsDisponiveis() {
            var pokemonsNaoEscolhidos = [];
            $scope.pokemons.forEach(function (pokemon) {
                if (!pokemon.escolhido) {
                    pokemonsNaoEscolhidos.push(pokemon);
                }
            });
            return pokemonsNaoEscolhidos;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function trocarVezJogador() {
            $scope.suaVez = !$scope.suaVez;
            getMensagemJogadorDaVez();
        }

        function escolherMaquina() {
            if ($scope.oponentePokemons.length < 3) {
                var pokemonEscolhido = escolherMaquinaMinMax();
                setarJogadaPokemon($scope.oponentePokemons, pokemonEscolhido);
            }

            trocarVezJogador();
            verificarVencedor();
        }

        function setarJogadaPokemon(pokemons, pokemonEscolhido) {
            pokemonEscolhido.escolhido = true;
            pokemons.push(pokemonEscolhido);
        }

        function verificarVencedor() {
            if ($scope.meusPokemons.length === 3 && $scope.oponentePokemons.length === 3) {
                var forcaMeusPokemons = getForcaPokemons($scope.meusPokemons, $scope.oponentePokemons);
                var forcaOponentePokemons = getForcaPokemons($scope.oponentePokemons, $scope.meusPokemons);

                if (forcaMeusPokemons > forcaOponentePokemons) {
                    $scope.mensagem = "Você ganhou";
                } else if (forcaOponentePokemons > forcaMeusPokemons) {
                    $scope.mensagem = "Você perdeu";
                } else {
                    $scope.mensagem = "Aconteceu empate";
                }
            }
        }

        function getForcaPokemons(pokemons, pokemonsAdversario) {
            var forcaTotal = 0;

            pokemons.forEach(function (pokemon) {
                forcaTotal += pokemon.forca;
                forcaTotal += getForcaPokemonComVantagem(pokemon, pokemonsAdversario);
            });

            return forcaTotal
        }

        function getForcaPokemonComVantagem(pokemon, pokemonsContra) {
            var forcaVantagem = 0;
            pokemonsContra.forEach(function (pokemonContra) {
                if (pokemon.vantagens.includes(pokemonContra.id)) {
                    forcaVantagem += 4;
                }
            });

            return forcaVantagem;
        }

        $scope.escolher = function (pokemon) {
            if ($scope.suaVez && !pokemon.escolhido) {
                if ($scope.meusPokemons.length < 3) {
                    setarJogadaPokemon($scope.meusPokemons, pokemon);
                } else {
                    $scope.mensagemQtdPokemons = "Você já escolhe 3 Pokemons";
                }

                trocarVezJogador();
                escolherMaquina();
                verificarVencedor();
            }
        };

        function escolherMaquinaMinMax() {

            //valor acumulado do player
            var valorAcumuladoP = getForcaPokemons($scope.meusPokemons, $scope.oponentePokemons);
            //valor acumulado do pc
            var valorAcumuladoPC = getForcaPokemons($scope.oponentePokemons, $scope.meusPokemons);

            var pokemonEscolhido;
            if ($scope.meusPokemons[0] && $scope.meusPokemons[1]) {
                //Nesse caso soh falta escolher o ultimo do PC
                //Logo soh tem que iterar entre todos os pokemons ainda disponiveis pra verificar qual a melhor jogada do PC
                pokemonEscolhido = getMaxPc(getPokemonsDisponiveis(), $scope.meusPokemons, $scope.oponentePokemons);
            } else {
                //Nesse caso OU
                //jah foram escolhidos dois pokemons pelo player, e um pelo pc
                // OU
                //foi escolhido apenas um pokemon pelo player e nenhum pelo pc
                //de qualquer forma o metodo abaixo calcula qual a melhor jogada supondo a teoria do algoritmo MINMAX
                pokemonEscolhido = getMaxPCSup($scope.oponentePokemons, $scope.meusPokemons, getPokemonsDisponiveis(), $scope.meusPokemons.length);
            }

            return pokemonEscolhido;
        }

        function removerPokemonDeArray(pokemons, pokemon) {
            var index = pokemons.indexOf(pokemon);
            pokemons.splice(index, 1);
        }

        function getMaxPCSup(pokemonsPC, pokemonsPlayer, pokemonsDisponiveis, size) {
            var pokemonEscolhido;
            var listaPokemonTemporariaPC1 = getNewObjListaPokemons(pokemonsPC);
            var listaPokemonTemporariaPlayer1 = getNewObjListaPokemons(pokemonsPlayer);
            var listaPokemonDisponiveis1 = getNewObjListaPokemons(pokemonsDisponiveis);

            pokemonsDisponiveis.forEach(function (pokemon) {
                listaPokemonTemporariaPC1.push(pokemon);

                removerPokemonDeArray(listaPokemonDisponiveis1, pokemon);

                var pokemonTemporarioPlayer3;
                var pokemonTemporarioPC3;
                var valorAcumuladoTemporarioPlayer2 = getForcaPokemons(listaPokemonTemporariaPlayer1, listaPokemonTemporariaPC1);
                var valorAcumuladoTemporarioPC2 = getForcaPokemons(listaPokemonTemporariaPC1, listaPokemonTemporariaPlayer1);

                listaPokemonDisponiveis1.forEach(function (pokemon2) {
                    //iteracao pra ver qual a melhor jogada para o player, qual o provavel pokemon que ele vai selecionar
                    var listaPokemonTemporariaPC2 = getNewObjListaPokemons(listaPokemonTemporariaPC1);
                    var listaPokemonTemporariaPlayer2 = getNewObjListaPokemons(listaPokemonTemporariaPlayer1);
                    var listaPokemonDisponiveis2 = getNewObjListaPokemons(listaPokemonDisponiveis1);

                    listaPokemonTemporariaPlayer2.push(pokemon2);

                    removerPokemonDeArray(listaPokemonDisponiveis2, pokemon2);

                    if (size === 2) {
                        var pokemon3 = getMaxPc(listaPokemonDisponiveis2, listaPokemonTemporariaPlayer2, listaPokemonTemporariaPC2);
                        listaPokemonTemporariaPC2.push(pokemon3);
                    } else {
                        var pokemonsTemp = [];
                        pokemonsTemp = getMaxPCSup(listaPokemonTemporariaPC2, listaPokemonTemporariaPlayer2, listaPokemonDisponiveis2, listaPokemonTemporariaPlayer2.length);
                        listaPokemonTemporariaPC2.push(pokemonsTemp[0]);
                        listaPokemonTemporariaPC2.push(pokemonsTemp[2]);
                        listaPokemonTemporariaPlayer2.push(pokemonsTemp[1]);
                    }

                    var valorAcumuladoTemporarioP3 = getForcaPokemons(listaPokemonTemporariaPlayer2, listaPokemonTemporariaPC2);
                    var valorAcumuladoTemporarioPC3 = getForcaPokemons(listaPokemonTemporariaPC2, listaPokemonTemporariaPlayer2);
                    if ((valorAcumuladoTemporarioPC2 - valorAcumuladoTemporarioPlayer2) < (valorAcumuladoTemporarioPC3 - valorAcumuladoTemporarioP3)) {
                        valorAcumuladoTemporarioPC2 = valorAcumuladoTemporarioPC3;
                        valorAcumuladoTemporarioPlayer2 = valorAcumuladoTemporarioP3;
                        pokemonTemporarioPlayer3 = pokemon2;
                        pokemonTemporarioPC3 = pokemon3;
                    }
                });

                //verifica se essa escolha foi melhor que a anterior
                listaPokemonTemporariaPlayer1.push(pokemonTemporarioPlayer3);
                listaPokemonTemporariaPC1.push(pokemonTemporarioPC3);
                valorAcumuladoTemporarioPlayer2 = getForcaPokemons(listaPokemonTemporariaPlayer1, listaPokemonTemporariaPC1);
                valorAcumuladoTemporarioPC2 = getForcaPokemons(listaPokemonTemporariaPC1, listaPokemonTemporariaPlayer1);
                if ((valorAcumuladoTemporarioPC2 - valorAcumuladoTemporarioPlayer2) > (valorAcumuladoTemporarioPC2 - valorAcumuladoTemporarioPlayer2)) {
                    pokemonEscolhido = pokemon;
                }
            });
            //retorna a lista com o melhor pokemon a ser escolhido agora, e quais o algoritmo supoe que serao escolhidos futuramente
            //sendo pokemon 2 a terceira escolha do jogador
            //e pokemon 3 a logica terceira escolha do PC

            return pokemonEscolhido;
        }

        function getNewObjListaPokemons(pokemonsPC) {
            var listaPokemonTemporariaPC1 = [];
            return listaPokemonTemporariaPC1.concat(pokemonsPC);
        }

        function getMaxPc(pokemonDisponiveis, pokemonsPlayer, pokemonsAdversario) {
            var pokemonEscolhido;
            var forcaPokemonsPlayer = getForcaPokemons(pokemonsPlayer, pokemonsAdversario);
            var forcaPokemonsAdversario = getForcaPokemons(pokemonsAdversario, pokemonsPlayer);

            var pokemonsDispoiveisParaConcat = getNewObjListaPokemons(pokemonsAdversario);

            pokemonDisponiveis.forEach(function (pokemon) {
                pokemonsDispoiveisParaConcat.push(pokemon);
                var valorTemporarioAdversario = getForcaPokemons(pokemonsDispoiveisParaConcat, pokemonsPlayer);
                var valorTemporarioPlayer = getForcaPokemons(pokemonsPlayer, pokemonsDispoiveisParaConcat);
                if ((valorTemporarioAdversario - valorTemporarioPlayer) > (forcaPokemonsAdversario - forcaPokemonsPlayer)) {
                    forcaPokemonsPlayer = valorTemporarioPlayer;
                    forcaPokemonsAdversario = valorTemporarioAdversario;
                    pokemonEscolhido = pokemon;
                }
            });

            return pokemonEscolhido;
        }

        $scope.init();

    });
})();
