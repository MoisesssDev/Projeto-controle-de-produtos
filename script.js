class Produto {
	constructor() {
		this.arrayProdutos = [];
		this.id = 1;
		this.editId = null;
	}

	// salvarProduto()- obtém a entrada do usuário do formulário e a valida, adicionando-a ao arrayProdutosse se a validação for bem-sucedida.
	salvarProduto() {
		// Objeto onde vai ficar armazenado o produto
		let produto = {};

		// Variavel onde esta guardada o valor dos input
		let nomeProduto = document.getElementById('produto').value;
		let preco = document.getElementById('preco').value;

		// Aqui é passado o atributo a sua respectiva atributo
		produto.nomeProduto = nomeProduto;
		produto.preco = preco;
		produto.id = this.id;

		// Condicinal que chama o metodo atualizar, quando for para editar o produto
		if (this.editId != null) {
			this.atualizar(this.editId, produto);
		}

		// Valida se os input estão preenchidos corretamente
		if (!produto.nomeProduto || !produto.preco) {
			alert('Por favor forneça todos os dados do produto (nome, preço).');
			return;
		}

		// Valida se o produto ja foi adicionado anteriormente
		let produtoExistente = this.arrayProdutos.find(
			(produto) => produto.nomeProduto === nomeProduto
		);

		// Condicional que determina se o novo produto vai ser adicionado ou não.
		if (produtoExistente) {
			alert('O produto ja está na tabela.');
		} else {
			this.arrayProdutos.push(produto);
			this.id++;
		}

		console.log(this.arrayProdutos);

		this.listaTabela();
		this.limparCampo();
	}

	// O metodo responsavel por atualizar os atributos do item selecionado
	atualizar(id, produto) {
		// Aqui localizamos o item que queremos atualizar
		let idExistente = this.arrayProdutos.find((produto) => produto.id === id);
		// Aqui pegamos a posição onde o item esta localizado no array
		let index = this.arrayProdutos.indexOf(idExistente);

		// Aqui é adicionado o novo nome e o novo preço
		this.arrayProdutos[index].nomeProduto = produto.nomeProduto;
		this.arrayProdutos[index].preco = produto.preco;
	}

	// Aqui é realizado a formatação da Tabela
	listaTabela() {
		// Aqui é armazenado o corpo da tabela
		let tbody = document.getElementById('tbody');

		// Aqui é o reset da tabela, para impedir que cada vez que esse metodo for chamado ele imprima a tabela anterior.
		tbody.innerText = '';

		// Aqui é onde são inseridas as linhas e colunas, seus valores respectivos e os botões de ações.
		for (let index = 0; index < this.arrayProdutos.length; index++) {
			let tr = tbody.insertRow();

			let td_id = tr.insertCell();
			let td_produto = tr.insertCell();
			let td_valor = tr.insertCell();
			let td_acao = tr.insertCell();

			td_id.innerText = this.arrayProdutos[index].id;
			td_produto.innerText = this.arrayProdutos[index].nomeProduto;
			td_valor.innerText = this.arrayProdutos[index].preco;

			td_id.classList.add('center');

			let imgEditar = document.createElement('img');
			imgEditar.src = 'img/editar.png';
			imgEditar.setAttribute(
				'onclick',
				'produto.editar(' + JSON.stringify(this.arrayProdutos[index]) + ')'
			);

			let imgDeletar = document.createElement('img');
			imgDeletar.src = 'img/deletar-lixeira.png';
			imgDeletar.setAttribute(
				'onclick',
				'produto.deletar(' + this.arrayProdutos[index].id + ')'
			);

			td_acao.appendChild(imgEditar);
			td_acao.appendChild(imgDeletar);
		}
	}

	// Metodo responsavel por resetar o html, quando chamado.
	limparCampo() {
		document.getElementById('produto').value = '';
		document.getElementById('preco').value = '';
		document.getElementById('btn-1').innerText = 'Salvar';

		this.editId = null;
	}

	// Metodo que deleta  o produto a partir do seu id.
	deletar(id) {
		// O filter é usado para criar um novo array, sem o item selecionado para ser excluido.
		if (confirm('Deseja realmente deletar o produto do ID: ' + id)) {
			let novoArrayProdutos = this.arrayProdutos.filter((produto) => {
				return produto.id !== id;
			});

			// Aqui atribuimos o novo array ao array principal.
			this.arrayProdutos = novoArrayProdutos;
			this.listaTabela();
		}
	}

	// Metodo que edita o item
	editar(dados) {
		// Aqui é dado um valor ao atributo editId.
		this.editId = dados.id;

		// Aqui é adcionado os valores do respectivo item aos campos do input.
		document.getElementById('produto').value = dados.nomeProduto;
		document.getElementById('preco').value = dados.preco;

		// Aqui mudamos o nome do botão.
		document.getElementById('btn-1').innerText = 'Atualizar';
	}
}

var produto = new Produto();
