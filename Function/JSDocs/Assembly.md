
# 程序集

## 导入

### 使用预加载配置文件

详见[Assemblies](Function/JSDocs/PreLoadConfig.md#Assemblies)

### 使用NET的反射功能

需要开启`AllowSystemReflection`和`AllowGetType`选项，详见[预加载配置](Function/JSDocs/PreLoadConfig.md)

```js
const Assembly = System.Reflection.Assembly.LoadFrom(/* 文件名称 */);
const Type = Assembly.GetType(/* 命名空间.类名 */);

let obj = System.Activator.CreateInstance(Type, /* 构造函数参数 */);
```

## 使用（系统NET程序集）

与C#中一致

以下是个例子

```cs
// https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.forms.form

public void CreateMyForm()
{
   // Create a new instance of the form.
   Form form1 = new Form();
   // Create two buttons to use as the accept and cancel buttons.
   Button button1 = new Button();
   Button button2 = new Button();
  
   // Set the text of button1 to "OK".
   button1.Text = "OK";
   // Set the position of the button on the form.
   button1.Location = new Point(10, 10);
   // Set the text of button2 to "Cancel".
   button2.Text = "Cancel";
   // Set the position of the button based on the location of button1.
   button2.Location
      = new Point(button1.Left, button1.Height + button1.Top + 10);
   // Set the caption bar text of the form.   
   form1.Text = "My Dialog Box";
   // Display a help button on the form.
   form1.HelpButton = true;

   // Define the border style of the form to a dialog box.
   form1.FormBorderStyle = FormBorderStyle.FixedDialog;
   // Set the MaximizeBox to false to remove the maximize box.
   form1.MaximizeBox = false;
   // Set the MinimizeBox to false to remove the minimize box.
   form1.MinimizeBox = false;
   // Set the accept button of the form to button1.
   form1.AcceptButton = button1;
   // Set the cancel button of the form to button2.
   form1.CancelButton = button2;
   // Set the start position of the form to the center of the screen.
   form1.StartPosition = FormStartPosition.CenterScreen;
   
   // Add button1 to the form.
   form1.Controls.Add(button1);
   // Add button2 to the form.
   form1.Controls.Add(button2);
   
   // Display the form as a modal dialog box.
   form1.ShowDialog();
}
```

转换后👇

```js
function form() {
    let form1 = new System.Windows.Forms.Form();
    // Create two buttons to use as the accept and cancel buttons.
    let button1 = new System.Windows.Forms.Button();
    let button2 = new System.Windows.Forms.Button();

    // Set the text of button1 to "OK".
    button1.Text = "OK";
    // Set the position of the button on the form.
    button1.Location = new System.Drawing.Point(10, 10);
    // Set the text of button2 to "Cancel".
    button2.Text = "Cancel";
    // Set the position of the button based on the location of button1.
    button2.Location
        = new System.Drawing.Point(button1.Left, button1.Height + button1.Top + 10);
    // Set the caption bar text of the form.   
    form1.Text = "My Dialog Box";
    // Display a help button on the form.
    form1.HelpButton = true;
    // Define the border style of the form to a dialog box.
    form1.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
    // Set the MaximizeBox to false to remove the maximize box.
    form1.AcceptButton = button1;
    // Set the cancel button of the form to button2.
    form1.CancelButton = button2;
    // Set the start position of the form to the center of the screen.
    form1.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;

    // Add button1 to the form.
    form1.Controls.Add(button1);
    // Add button2 to the form.
    form1.Controls.Add(button2);

    // Display the form as a modal dialog box.
    form1.ShowDialog();
}
```

实际上你只要修改声明语句即可

>[!TIP]你也可以将类设置为变量，简化部分声明语句
>
>```js
>const Button = System.Windows.Forms.Button;
>let button1 = new Button();
>//...
>```
