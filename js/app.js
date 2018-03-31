angular.module('GamePokemon', [])
    .controller('GameController', function ($scope) {

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
