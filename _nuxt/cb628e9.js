(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{874:function(e,t,n){"use strict";n.r(t);var r,o=n(0),c=(n(16),{name:"voken-v12",middleware:["web3","vokenResale"],layout:"white",computed:{status:function(){return this.$store.state.vokenResale.status},countdown:function(){return this.$store.state.vokenResale.deadlineCountdown},account:function(){return this.$store.state.vokenResale.account},notWorkForYourAddress:function(){return"0"===this.$store.state.vokenResale.account.v1.balance&&"0"===this.$store.state.vokenResale.account.v2.balance}},watch:{"$store.state.ether.account":(r=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("vokenResale/SYNC_ACCOUNT");case 2:return e.next=4,this.update();case 4:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.update();case 2:case"end":return t.stop()}}),t)})))()},methods:{update:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("vokenResale/SYNC_ACCOUNT_V1_RESALE");case 2:return t.next=4,e.$store.dispatch("vokenResale/SYNC_ACCOUNT_V2_RESALE");case 4:return t.next=6,e.$store.dispatch("vokenResale/SYNC_ACCOUNT_V1_UPGRADE");case 6:return t.next=8,e.$store.dispatch("vokenResale/SYNC_ACCOUNT_V2_UPGRADE");case 8:case"end":return t.stop()}}),t)})))()}}}),l=n(2),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"v12resale"},[n("layout-hero-simple",{scopedSlots:e._u([{key:"title",fn:function(){return[e._v("\n      "+e._s(e.$t("v12.Resale_or_Upgrade"))+"\n    ")]},proxy:!0},{key:"text",fn:function(){return[e._v("\n      "+e._s(e.$t("v12.Resale__Program_for__"))+"\n    ")]},proxy:!0}])}),e._v(" "),e.notWorkForYourAddress?n("div",{staticClass:"resp-wide pt-24 pb-80 text-gray-500 text-center"},[n("div",{staticClass:"font-bold text-xl xl:text-2xl"},[e._v("\n      "+e._s(e.$t("v12.Not_work_for_your_address"))+"\n    ")]),e._v(" "),n("div",{staticClass:"resp-mt font-mono text-base xl:text-xl break-all"},[e._v("\n      "+e._s(e.$store.state.ether.account)+"\n    ")])]):n("div",[n("v12-audited"),e._v(" "),n("v12-progress",{staticClass:"bg-indigo-50"}),e._v(" "),n("v12-resale"),e._v(" "),n("v12-upgrade",{staticClass:"bg-indigo-50"})],1)],1)}),[],!1,null,"749d7bce",null);t.default=component.exports;installComponents(component,{LayoutHeroSimple:n(246).default,V12Audited:n(267).default,V12Progress:n(268).default,V12Resale:n(269).default,V12Upgrade:n(270).default})}}]);