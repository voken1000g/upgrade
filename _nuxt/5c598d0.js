(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{873:function(e,t,n){"use strict";n.r(t);var r,o,c=n(0),d=(n(18),n(34),n(35),n(14),n(23)),l=n.n(d),v=n(7),f=n.n(v),h=n(1),_=n(24),m={name:"dev-voken-index",middleware:["web3","voken"],layout:"white",data:function(){return{isAgent:!1,address:"",account:{address:"",etherBalance:"",balance:"",vesting:"",isBank:"",referrer:""}}},mounted:(o=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("voken/SYNC_IS_AGENT");case 2:case"end":return e.stop()}}),e,this)}))),function(){return o.apply(this,arguments)}),watch:{"$store.state.ether.account":(r=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("voken/SYNC_IS_AGENT");case 2:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})},computed:{fnEthereum:function(){return _.a},ether:function(){return this.$store.state.ether},addressStatus:function(){return this.address?l.a.utils.isAddress(this.address)?"success":"error":null}},methods:{query:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.account.address=e.address,t.next=3,e.$store.state.voken.dataContract().methods.data(e.address).call().then(e.onQuery).catch((function(t){e.account.address="",console.error("::: C[dev-voken] query",t)}));case 3:case"end":return t.stop()}}),t)})))()},onQuery:function(e){this.account.etherBalance=l.a.utils.fromWei(e.etherBalance,"ether"),this.account.balance=h.a.ns2Str(e.balance,9),this.account.vesting=h.a.ns2Str(e.vesting,9),this.account.available=h.a.ns2Str(new f.a(e.balance).minus(new f.a(e.vesting)).toString()),this.account.isBank=e.isBank,this.account.referrer=e.referrer}}},w=n(2),component=Object(w.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("layout-hero-simple",{scopedSlots:e._u([{key:"title",fn:function(){return[e._v("\n      #"+e._s(e.$store.state.ether.blockNumberStr)+"\n    ")]},proxy:!0},{key:"text",fn:function(){return[e._v("\n      Dashboard for Developers\n    ")]},proxy:!0}])}),e._v(" "),n("div",{staticClass:"bg-indigo-50"},[n("div",{staticClass:"resp-wide py-16"},[n("layout-h2",{scopedSlots:e._u([{key:"title",fn:function(){return[e._v("\n          Account\n        ")]},proxy:!0}])}),e._v(" "),n("div",{staticClass:"resp-mt flex items-end space-x-2"},[n("div",{staticClass:"flex-grow",class:e.addressStatus},[n("label",{attrs:{for:"default1"}},[e._v("\n            ETH Address\n          ")]),e._v(" "),n("div",{staticClass:"relative mt-1"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.address,expression:"address"}],staticClass:"input-indigo w-full py-3 pl-4 pr-12 font-mono text-sm md:text-base",attrs:{type:"text",id:"default1",placeholder:"ETH Address"},domProps:{value:e.address},on:{input:function(t){t.target.composing||(e.address=t.target.value)}}}),e._v(" "),n("layout-input-esw")],1)]),e._v(" "),n("div",{staticClass:"flex-grow-0"},[n("button",{staticClass:"w-full btn justify-center py-3 px-6 uppercase",attrs:{type:"button"},on:{click:e.query}},[e._v("\n            Query\n          ")])])]),e._v(" "),n("div",{staticClass:"mt-4 space-y-2"},[n("dev-voken-agent",{attrs:{address:e.address}}),e._v(" "),n("dev-voken-minter",{attrs:{address:e.address}}),e._v(" "),n("dev-voken-bank",{attrs:{address:e.address}})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.account.address,expression:"account.address"}],staticClass:"resp-mt bg-white shadow overflow-hidden sm:rounded-lg"},[n("div",{staticClass:"div-striped-list-header space-x-2"},[n("div",[n("h3",[e._v("\n              ETH Account\n            ")]),e._v(" "),n("p",{staticClass:"font-mono"},[e._v("\n              "+e._s(e.account.address)+"\n            ")])])]),e._v(" "),n("div",{staticClass:"border-t border-gray-200 px-4 py-5 sm:p-0"},[n("dl",{staticClass:"sm:divide-y sm:divide-gray-200"},[n("div",{staticClass:"div-striped-list-card"},[n("dt",[e._v("\n                ETH balance\n              ")]),e._v(" "),n("dd",[n("fa",{staticClass:"text-indigo-600",attrs:{icon:["fab","ethereum"]}}),e._v("\n                "+e._s(e.account.etherBalance)+" ETH\n              ")],1)]),e._v(" "),n("div",{staticClass:"div-striped-list-card"},[n("dt",[e._v("\n                VokenTB balance\n              ")]),e._v(" "),n("dd",[e._v("\n                "+e._s(e.account.balance)+" VokenTB\n                "),n("span",{directives:[{name:"show",rawName:"v-show",value:e.account.balance>"0",expression:"account.balance > '0'"}]},[e.account.balance===e.account.vesting?n("span",{staticClass:"text-gray-400"},[e._v("\n                    (vesting)\n                  ")]):e.account.balance===e.account.available?n("span",{staticClass:"text-gray-400"},[e._v("\n                    (all available)\n                  ")]):n("span",[e._v("\n                    ("+e._s(e.account.available)+" available)\n                  ")])])])]),e._v(" "),n("div",{staticClass:"div-striped-list-card"},[n("dt",[e._v("\n                Referrer\n              ")]),e._v(" "),n("dd",[e.fnEthereum.isZeroAddress(e.account.referrer)?e._e():n("span",[e._v("\n                  "+e._s(e.account.referrer)+"\n                ")]),e._v(" "),e.fnEthereum.isZeroAddress(e.account.referrer)?n("span",[e._v("\n                  N/A\n                ")]):e._e()])])])])])],1)]),e._v(" "),n("dev-voken-addresses"),e._v(" "),n("dev-voken-migrations",{staticClass:"bg-indigo-50",attrs:{s:""}})],1)}),[],!1,null,"48ee233d",null);t.default=component.exports;installComponents(component,{LayoutHeroSimple:n(246).default,LayoutH2:n(29).default,LayoutInputEsw:n(103).default,DevVokenAgent:n(257).default,DevVokenMinter:n(262).default,DevVokenBank:n(258).default,DevVokenAddresses:n(256).default,DevVokenMigrations:n(261).default})}}]);