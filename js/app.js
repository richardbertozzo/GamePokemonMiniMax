angular.module('GamePokemon', [])
    .controller('GameController', function ($scope) {

        function Pokemon(id, forca, tipo, vantagens) {
            this.id = id;
            this.forca = forca;
            this.tipo = tipo;
            this.vantagens = vantagens;
        }

        $scope.pokemons = [];

        $scope.pokemons.push(new Pokemon(1, 3, "Água", [3, 4, 7]));
        $scope.pokemons.push(new Pokemon(2, 3, "Planta", [1, 6, 8]));
        $scope.pokemons.push(new Pokemon(3, 3, "Fogo", [2, 5, 9]));
        $scope.pokemons.push(new Pokemon(4, 6, "Lutador", [5, 8]));
        $scope.pokemons.push(new Pokemon(5, 6, "Eletrico", [6, 9]));
        $scope.pokemons.push(new Pokemon(6, 6, "Psico", [4, 7]));
        $scope.pokemons.push(new Pokemon(7, 9, "Pedra", [9]));
        $scope.pokemons.push(new Pokemon(8, 9, "Ar", [7]));
        $scope.pokemons.push(new Pokemon(9, 9, "Gelo", [8]));

    });
