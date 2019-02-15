var personalData = [], headerData = [];
var personalStr = {};

$(window).on('load', function(event) {
 loadCsv();
});
function loadCsv(){
   $.ajax({
    url: 'assets/data/PaymentsData.csv',
    dataType: '',
  }).done(successFunction);
}
function successFunction(data) {
  var csv = Papa.parse(data);

  $.each(csv.data, function(index, val) {
    if (index == 0){
      $.each(val, function(index, val) {
        var obj = { text : val , value : val.toLowerCase()};
        headerData.push(obj);    
      });
    }else{
      $.each(val, function(index, val) {
        if(index < 4){
          personalStr[headerData[index]['value']] = val;
        }else{
          personalStr[headerData[index]['value']] = val;
          personalData.push(personalStr);
          personalStr={};
        }
      });
    }
  });


  window.vue = new Vue({
      el: '#app',
      data: () => ({
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        pagination: {
          sortBy: 'id',
          rowsPerPage: 10
        },
        message : null,
        bottomDialog: false,
        bottomMessage: '',
        bottomMessageColor: '',
        selected: [],
        search: '',
        search2: '',
        isMobile: false,
        headers: headerData,
        personal: personalData,
        actions :[
          {'value':'showAllAmount', 'text':'Show All Amount'},
          {'value':'showPayee', 'text':'Show Payee Staff'},
          {'value':'showDebtor', 'text':'Show Debtor Amount'}
        ],
         dialog: false
      }),
      computed: {
        filteredItems() {
          return this.personal.filter((i) => {
            return Date.parse(i.date)>Date.parse(this.date) && Date.parse(i.date)<Date.parse(this.date2) || this.date == new Date().toISOString().substr(0, 10);
          })
        }
      },
      methods: {
        onResize() {
          if (window.innerWidth < 769)
            this.isMobile = true;
          else
            this.isMobile = false;
        },
        toggleAll() {
          if (this.selected.length) this.selected = []
          else this.selected = this.personal.slice()
        },
        changeSort(column) {
          if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
          } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
          }
        },
        dataFilter(query) {
          switch(query) {

            case 'showAllAmount':
              var total = 0;
              $.each(personalData, function(index, val) {
                total += parseFloat(val.amount);
              });
              this.message = 'Companys total debt: ' + total
              this.dialog = true
              break;
            case 'showPayee':
              var list = this.personal.filter(p => parseInt(p.amount) < 0), m=''
              list.forEach(
                function(val){
                  console.log(val.name);
                  m += val.name + '<br>'
                }
              )
              this.message = m
              this.dialog=true
              break;
            case 'showDebtor':
              var list = this.personal.filter(p => parseInt(p.amount) > 0), m=''
              list.forEach(
                function(val){
                  console.log(val.name);
                  m += val.name + '<br>'
                }
              )
              this.message = m
              this.dialog=true
              break;
            default:
              // code block
          }          
        },
        saveEdit () {
          this.bottomDialog = true
          this.bottomMessageColor = 'success'
          this.bottomMessage = 'Data saved'
        },
        cancelEdit () {
          this.bottomDialog = true
          this.bottomMessageColor = 'error'
          this.bottomMessage = 'Canceled'
        },
        openBottomMessage () {
          this.bottomDialog = true
          this.bottomMessageColor = 'info'
          this.bottomMessage = 'Dialog opened'
        },
      }
})
}



