import 'dart:convert';

import 'package:flutter/material.dart';
import 'CompanyItem.dart';
import 'company.dart';
import 'package:http/http.dart' as http;
import 'package:pull_to_refresh/pull_to_refresh.dart';

// 原来还可以这么玩
class FindScreen extends StatefulWidget {
  FindScreen({Key key}) : super(key: key);

  @override
  _FindScreenState createState() => _FindScreenState();
}

class _FindScreenState extends State<FindScreen> {

  List<Company> _companies = [];
  var page = 1;

  RefreshController _refreshController = RefreshController(initialRefresh: false);

  @override
  void initState() {
    super.initState();

    getCompanyList2();
  }

  /*
  （1）下拉刷新：请求数据后替换数据
  （2）上拉加载更多：拼接数据
  */

  getCompanyList2() async{
    String url = 'http://m.app.haosou.com/index/getData?type=1&page=$page';
    var response = await http.get(url);
    var data = response.body;
    var json = jsonDecode(data);
    setState(() {
      _companies.addAll(Company.fromMapData(json));
    });
  }

  Widget _buildContent() {
    if(_companies.isEmpty) {
      return new Center(
        child: CircularProgressIndicator(),
      );
    }

    return SmartRefresher(
      controller: _refreshController,
      enablePullDown: true,
      enablePullUp: true,
      header: ClassicHeader(
        refreshingText: '正在加载中...', 
        idleText: '下拉刷新',
        completeText:'加载完成',
        failedText: '数据刷新异常',
        releaseText:'松开刷新'),
      footer: ClassicFooter(
        idleText:'加载更多数据',
        loadingText:'玩命加载中...',
        noDataText:'没有更多数据'
      ),
      onRefresh: _onRefresh,
      onLoading: _onLoading,
      child: ListView.builder(
        itemBuilder: (context, index) {
          var model = _companies[index];
          return InkWell(
            child: CompanyItem(model),
            onTap: (){
              Navigator.push(context, new MaterialPageRoute(
                builder: (context) => new Detail()
              ));
            }, 
          );
        },
        itemCount: _companies.length,
      ),
    );

  }

  void _onRefresh() async{
    setState(() {
      page = 1;
    });
    await Future.delayed(Duration(seconds: 2),(){
      _refreshController.refreshCompleted();
      getCompanyList2();
      // _refreshController.refreshFailed()  
    });
  }

  
  void _onLoading() async{
    setState(() {
      page = page + 1;
    });
    await Future.delayed(Duration(seconds: 2),(){
      _refreshController.loadComplete();
      getCompanyList2();
      // _refreshController.loadFailed()  
      // _refreshController.loadNoData();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: new Text('发现'), 
      ),
      body: _buildContent()
    );
  }
}

class Detail extends StatelessWidget {
  const Detail({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("详情页"),
      ),
      body: new Center(
        child: Text(
          '详情页',
          style: new TextStyle(
            color: Colors.red,
            fontSize: 30,
            fontWeight: FontWeight.bold
          ),
        ), 
      ),
    );
  }
}