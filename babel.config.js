module.exports = {

    /* "Preset" é um determinado conjunto de plugins */
    presets: [

        /* Preset para detecção do "environment" */
        '@babel/preset-env',

        /* Preset para TypeScript */
        '@babel/preset-typescript',

        /* Preset para entender a sintaxe do React */
        /* Uso essa estrutura pra informar configurações do preset */
        /* Além disso, com essa config não preciso importar o react em todas as paginas */
        ['@babel/preset-react', {
            runtime: 'automatic'
        }]
    ]
}