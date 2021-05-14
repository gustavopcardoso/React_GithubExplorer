/* Webpack roda dentro do node, então entende o "require". */
/* Crio variáveis para os plugins */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackFastRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

/* Variável de ambiente que javascript acessa. Através delas, consigo identificar se é dev ou prod */
/* Tinha algo parecido com isso no projeto do VB */
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {

    /* Configura para ambiente de desenvolvimento. A outra opção é "production" */
    mode: isDevelopment ? 'development' : 'production',

    /* "Source Map": literalmente 'mapeia' o código original no console do F12 em caso de erro, por exemplo */
    /* Conforme feito abaixo, tem modos diferentes pra ambientes de desenvolvimento e produção. */
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',

    /* Arquivo de entrada, inicial. */
    /* Uso essa estrutura pra acessar o diretório independente do SO */
    entry: path.resolve(__dirname, 'src', 'index.tsx'),

    /* Configuração do arquivo de saída */
    output: {

        /* O __dirname se refere ao diretório atual */
        path: path.resolve(__dirname, 'dist'),

        /* O arquivo de saída será o mesmo que configuramos para o Babel */
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    /* Algumas configs para o server local */
    devServer: {

        /* Indico onde fica o conteúdo, no caso o arquivo index.html */
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
    },
    plugins: [
        /* É um "if ternário" só que sem o else */
        isDevelopment && new WebpackFastRefreshPlugin(),

        /* Plugin pra não precisar importar o arquivo bundle.js (gerado pelo webpack) em cada lugar que precisar */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module: {

        /* Aqui eu defino as regras para o webpack. */
        rules: [

            /* Estou dizendo o seguinte: sempre que o webpack encontrar um arquivo jsx, "leia-o" utilizando o babel-loader. */
            /* Menos o que está no exclude. Arquivo de biblioteca não precisa. */
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean)
                    }
                }
            },

            /* Preciso tb indicar ao webpack como "ler" arquivos CSS. Não é tão óbvio pra ele. */
            /* Loaders adicionados com o comando yarn add style-loader css-loader */
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ],
    }
};