import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    money: 0,
    if_login: false,
    login_name: '',
    trade_money: 0,
    trade_num: 0,
    accounts: [{ id: '1', name: 'lky', pub_key: '0xefa9c263b1877686d18d4f294146db672044b47f', if_pass: false },
    { id: '2', name: 'wjy', pub_key: '0x2d43f62d340ad9362e37a7c690c3fcacdbf672b2', if_pass: false }],
    if_pass: false,
    users: {
      'lky': {
        id: '1',
        account: "lky",
        money: 0,
        if_pass: false,
        pub_key: '0xefa9c263b1877686d18d4f294146db672044b47f',
        private_key: 'cbe6a6d0d8f0df0d69e548233430b83422963d71049fab4cdeb930d527d7ee4f',
        data: [

        ],
        trade: [

        ]
      },
      'wjy': {
        id: '2',
        name: "wjy",
        money: 0,
        if_pass: 'false',
        pub_key: '0x2d43f62d340ad9362e37a7c690c3fcacdbf672b2',
        private_key: 'ec121934f215a60638ca551b510ec232b04bbdb72f8d9684107c406a85c6c618',
        data: [

        ],
        trade: [

        ]
      },


    },
    pets_market: [
      {
        ID: 1,
        名称: "tommy",
        品类: "狗",
        出生日期: "2000-1-1",
        价格: 100,
        描述: "a cute dog",
        picture: 'pet1.jpg'
      }, {
        ID: 2,
        名称: "tommy",
        品类: "猫",
        出生日期: "2000-1-1",
        价格: 200,
        描述: "a cute cat",
        picture: 'pet2.jpg'
      }, {
        ID: 3,
        名称: "tommy",
        品类: "猫",
        出生日期: "2000-1-1",
        价格: 200,
        描述: "a cat",
        picture: 'pet3.jpg'
      }, {
        ID: 4,
        名称: "tommy",
        品类: "兔",
        出生日期: "2000-1-1",
        价格: 300,
        描述: "rabbit",
        picture: 'pet4.jpg'
      },
    ],
    trades: []
  },
  getters: {
    MyPet(state) {
      let login_name = state.login_name
      if (login_name !== '')
        return state.users[login_name].data
    },
    MyTrade(state) {
      let login_name = state.login_name
      if (login_name !== '')
        return state.users[login_name].trade
    },
    Money(state) {
      let login_name = state.login_name
      if (login_name !== '')
        return state.users[login_name].money
    },
    LoginPub(state) {
      let login_name = state.login_name
      if (login_name !== '')
        return state.users[login_name].pub_key
    },
    PetMarket(state) {
      return state.pets_market
    }
  },
  mutations: {
    set_mypet(state, data) {
      let login_name = state.login_name
      state.users[login_name].data = data
    },
    set_pets(state, { data, user, money }) {
      state.users[user].data = data
      state.users[user].money = money
    },
    set_money(state, { user, money }) {
      state.users[user].money = money
    },
    set_pets_market(state, data) {
      // console.log(data)
      state.pets_market = [...data]
    },
    set_login_name(state, data) {
      state.login_name = data
    },
    set_sell_mypets(state, { sell_mypets, belong, data }) {
      state.users[belong].money = state.users[belong].money + data["价格"]
      state.users[belong].data = sell_mypets
    },
    set_bought_mypets(state, { buy_mypets, buy_belong, data }) {
      state.users[buy_belong].money = state.users[buy_belong].money - data["价格"]
      state.users[buy_belong].data = buy_mypets
    },
    set_sell_trade(state, { trade_item, belong }) {
      state.users[belong].trade.push(trade_item)
    },
    set_bought_trade(state, { trade_item, buy_belong }) {
      state.users[buy_belong].trade.push(trade_item)
    },
    set_trades(state, data) {
      state.trades.push(data)
    },
    set_trade_money(state, data) {
      state.trade_money += data
    },
    set_trade_num(state, data) {
      state.trade_num += data;
    }
  },
  actions: {
    bought({ commit, state, getters }, sub_data) {
      let data = { ...sub_data }
      let pets_market = state.pets_market, buy_mypets = getters.MyPet, sell_mypets = state.users[data.belong].data,
        belong = sub_data.belong

      let trade_item = {
        时间: "2019-07-05",
        交易商品: sub_data['名称'],
        价格: sub_data['价格'],
        卖方公钥: state.users[belong].pub_key,
        买方公钥: state.users[state.login_name].pub_key,
        卖方: belong,
        买方: state.login_name,
        状态: "已完成"
      }

      commit('set_trade_money', sub_data["价格"])
      commit('set_trade_num', 1)

      pets_market = pets_market.filter(item => {
        if (item.ID === data.ID)
          return false
        else
          return true
      })
      commit('set_pets_market', pets_market)

      data.belong = state.login_name
      data["状态"] = "未上架"
      buy_mypets.push({ ...data })
      let buy_belong = data.belong
      commit('set_bought_mypets', { buy_mypets, buy_belong, data })
      commit('set_bought_trade', { trade_item, buy_belong })

      sell_mypets = sell_mypets.filter(item => {
        if (item.ID === data.ID)
          return false
        else
          return true
      })
      commit('set_sell_mypets', { sell_mypets, belong, data })
      commit('set_sell_trade', { trade_item, belong })

    },
    complain({ commit, state }) {
      let user = 'lky', money = 1000, data = []
      data.push(state.users['wjy'].data[0])
      commit('set_pets', { data, user, money })
      user = 'wjy'
      data = []
      commit('set_pets', { data, user, money })

    },
    pass({ commit }) {
      let user = 'lky', money = 1000
      commit('set_money', { user, money })
      user = 'wjy'
      commit('set_money', { user, money })
    }
  }
})
