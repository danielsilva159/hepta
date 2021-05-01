Vue.component('todo-item', {
  template: '<h1>Isso é um item</h1>'
})
var inicio = new Vue({
	el:"#app",
    data: {
        listaSetor: [],
        nome: null,
        email: null,
        salario: null,
        idade: null,
        setor: null,
        mensagem: null
        
    },
    created: function(){
        let vm =  this;
        vm.buscaSetor();
    },
    methods:{
        buscaSetor: function(){
			const vm = this;
			axios.get("/funcionarios/rs/setor")
			.then(response => {vm.listaSetor = response.data;
		
			console.log("response setor", response.data);
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
		enviarFormulario: function(){
			axios.get("/funcionarios/rs/setor", {
				id: this.setor
			}).then(setorSelecionado =>{
				this.setor = setorSelecionado.data[0];
			}).then(() =>{
				let funcionario = {
						nome: this.nome,
						email: this.email,
						salario: this.salario,
						setor:  this.setor,
						idade: this.idade
					};
				axios.post("/funcionarios/rs/funcionarios", funcionario).then(response =>{
					limparCampos;
					this.mensagem = "Funcionario salvo com sucesso";
				}).catch(function (error){
					this.mostraAlertaErro("Erro interno");
				});
			})
				
		},
		limparCampos: function(){
			this.nome = null,
			this.email = null,
			this.salario = null,
			this.setor = null,
			this.idade = null
		}
    }
    
});