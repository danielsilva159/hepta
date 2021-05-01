const Home  = {
		  template: '<div>Home</div>'
		}

		const Login = {
		  template: '<div>Login</div>'
		}

		const About = {
		  template: '<div>About</div>',
		  url:'/pages/novo-funcionario.html'
		}

		const router = new VueRouter({
		  routes: [
		    { path: '/', component: Home },
		    { path: '/login', component: Login },
		    { path: '/pages/novo-funcionario.html', component: About }
		  ]
		})


var inicio = new Vue({
	el:"#inicio",
    data: {
        listaProdutos: [],
        listaProdutosHeader: [
			{sortable: false, key: "nome", label:"Nome"},
			{sortable: false, key: "fabricante.nome", label:"Fabricante"},
			{sortable: false, key: "volume", label:"Volume"},
			{sortable: false, key: "unidade", label:"Unidade"},
			{sortable: false, key: "estoque", label:"Estoque"}
		],
		showModal:false,
		idFuncionario:null,
		nome:''
    },
    created: function(){
        let vm =  this;
        vm.buscaProdutos();
    },
    methods:{
        buscaProdutos: function(){
			const vm = this;
			axios.get("/funcionarios/rs/funcionarios")
			.then(response => {vm.listaProdutos = response.data;
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
		abrirModal(id, nome){
			console.log(id);
			this.showModal = true;
			this.idFuncionario = id;
			this.nome = nome;
		},
		excluir(id){
			console.log('teste')
			axios.delete("/funcionarios/rs/funcionarios/"+id)
			.then(response => {
				this.showModal = false;
				this.buscaProdutos();
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
		 editar(id){
			this.$router.push('/funcionarios/pages/novo-funcionario.html')
		}
		},
		router
    
}).$mount('#inicio');


