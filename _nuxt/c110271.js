(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{528:function(e,r,t){var content=t(547);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(23).default)("3a3d992b",content,!0,{sourceMap:!1})},546:function(e,r,t){"use strict";t(528)},547:function(e,r,t){var n=t(22)((function(i){return i[1]}));n.push([e.i,'li[data-v-1a1fb234]{\n  font-family:Hack, monospace, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;\n  padding-top:1rem;\n  padding-bottom:1rem;\n}\nli .eth-account-avatar[data-v-1a1fb234]{\n    --tw-bg-opacity:1;\n    background-color:rgba(255, 255, 255, var(--tw-bg-opacity));\n    border-radius:9999px;\n    border-width:1px;\n    height:1.75rem;\n    width:1.75rem\n}\na[data-v-1a1fb234]:hover{\n    --tw-text-opacity:1;\n    color:rgba(22, 30, 46, var(--tw-text-opacity))\n}',""]),e.exports=n},574:function(e,r,t){"use strict";t.r(r);var n=t(1),o=(t(15),t(181)),c=t(0),l=t(184),f={name:"VokenDirectReferralList",components:{VueAvatar:o.a},data:function(){return{fnEtherscan:l.a,rewards:[],referrals:[]}},mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.getReferrerSet();case 2:case"end":return r.stop()}}),r)})))()},methods:{getReferrerSet:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$store.state.voken.contract().getPastEvents("ReferrerSet",{filter:{referrerAccount:e.$store.state.ether.account},fromBlock:0,toBlock:"latest"}).then(e.onGetReferrerSet).catch(e.onRewardsError);case 2:case"end":return r.stop()}}),r)})))()},onGetReferrerSet:function(e){var r=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.length>0){for(console.log("::: onGetReferrerSet events:",e),n=[],i=0;i<e.length;i++)n.push({blockNumber:c.a.ns2Str(e[i].blockNumber,0),transactionHash:e[i].transactionHash,account:e[i].returnValues.account});r.referrals=n}case 1:case"end":return t.stop()}}),t)})))()},onRewardsError:function(e){return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:console.error("::: C[EarlyBirdReferralRewards] onRewardsError:",e);case 1:case"end":return r.stop()}}),r)})))()}}},d=(t(546),t(7)),component=Object(d.a)(f,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"py-16 lg:py-24"},[t("div",{staticClass:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},[t("div",{staticClass:"max-w-4xl mx-auto text-center"},[t("h2",{staticClass:"text-3xl font-extrabold text-gray-900 sm:text-4xl"},[e._v("\n        "+e._s(e.$t("voken.referral.Direct_Referral_Records"))+"\n      ")])])]),e._v(" "),t("div",{staticClass:"resp-mt direct-referral-list"},[e.referrals.length>0?t("ul",e._l(e.referrals,(function(r){return t("li",[t("div",{staticClass:"drl-block"},[t("a",{attrs:{target:"_blank",href:e.fnEtherscan.tx(r.transactionHash)}},[e._v("\n            #"+e._s(r.blockNumber)+"\n          ")])]),e._v(" "),t("div",{staticClass:"drl-address"},[t("a",{attrs:{target:"_blank",href:e.fnEtherscan.address(r.account)}},[e._v("\n            "+e._s(r.account)+"\n          ")])])])})),0):t("div",{staticClass:"text-center text-gray-500"},[e._v("\n      "+e._s(e.$t("voken.referral.No_Referral_Record"))+"\n    ")])])])}),[],!1,null,"1a1fb234",null);r.default=component.exports}}]);