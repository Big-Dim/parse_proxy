//������ ������ ������� 
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

      countryMap: ['ALL','RU','US','DE'], // ������ ��� ������ �����
      country:'ALL',
      proxyTypes: [ .. ������ ��� ������ ���� ������
        { val:0, title:'Transparent', chk: false },
        { val:1, title:'Anonymous', chk: false },
        { val:2, title:'Elite', chk: false }
    ],
      alive: undefined
    }
   } , 
    mounted: function () {
  		this.getProxyMap();	// ����������� ������ � ������� � ��������� ������
    },
	computed: {
        getProxyFilteredMap: function(){// ��������� ��������� ������ �� �������� ���������
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
        getProxyMap: function () {// ������� ������� ������ � �������
   			let vm = this;
			axios.get('https://cors-anywhere.herokuapp.com/https://proxyfordevelopers.com/api/proxies/?format=json')
			.then(function (response) { //���� ��� ��������� ���������� ���������� ������ 
				Vue.set(vm, 'proxies', response.data);
				console.log(response.data);
			})
			.catch(function (error) {// ���� ������ - ������� ��������� 
				alert("err - ",error);
			});
		},     
    }
});
