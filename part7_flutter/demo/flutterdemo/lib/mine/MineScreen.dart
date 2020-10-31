import 'package:flutter/material.dart';
import 'navigation_task.dart';

class MineScreen extends StatelessWidget {
  const MineScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: new Text('我的'), 
      ),
      body: Center(
        child: RaisedButton(
          onPressed: (){
            Navigator.push(context, new MaterialPageRoute(
              builder: (context) => new NavigationTask()
            ));
          }
        ) 
      ),
    );
  }
}