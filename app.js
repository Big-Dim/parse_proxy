//Шаблон строки таблицы 
Vue.component('proxy', {
    template: '#template-proxy-raw',
    props: ['proxy'],
    methods: {}
 
})

new Vue({
    el: '#v-app',

	data () {
    return {
      proxies: [],
      proxy: {},

      countryMap: ['ALL','RU','US','DE'], // Массив для списка стран
      country:'ALL',
      proxyTypes: [ .. массив для выбора типа прокси
        { val:0, title:'Transparent', chk: false },
        { val:1, title:'Anonymous', chk: false },
        { val:2, title:'Elite', chk: false }
    ],
      alive: undefined
    }
   } , 
    mounted: function () {
  		this.getProxyMap();	// Запрашиваем данные с сервера и формируем массив
    },
	computed: {
        getProxyFilteredMap: function(){// Фильтруем имеющийся массив по заданным критериям
			let cn = this.country;
			let al = this.alive;
			let pr = (this.proxyTypes.filter(el => el.chk == true)).map(el=>el.val) ;
			console.log(pr, "--" , pr.indexOf(0), "--" , pr.indexOf(1));
  			return this.proxies.filter(el => {
				return (el.country  === cn || cn == "ALL") && (al === undefined || el.alive === al) && (pr.length == 0 || pr.indexOf(el.proxy_type)>-1);
			});  
        }
    },  

    methods: {
        getProxyMap: function () {// Функция запроса данных с сервера
   			let vm = this;
			axios.get('https://cors-anywhere.herokuapp.com/https://proxyfordevelopers.com/api/proxies/?format=json')
			.then(function (response) { //Если все нормально записываем полученный массив 
				Vue.set(vm, 'proxies', response.data);
				console.log(response.data);
			})
			.catch(function (error) {// если ошибка - выводим сообщение 
				alert("err - ",error);
			});
		},     
    }
});
