# Đề tài 11 nhóm 46: Xây dựng ứng dụng trên AWS cho phép tạo database và cung cấp API để thêm,xóa sửa trên database

## Các tính năng chính của Project
- Thêm, Xóa Table trên DynamoDB
- Thêm, xóa, Sửa các Record trên các Table
- Đăng nhập phân quyền sử dụng các bảng cho các User

## Công nghệ sử dụng
* Front-End: ReactJS, Antd
* Back-End: AWS Lambda (Function Url)
* Database: AWS DynamoDB

## Các thành viên
1. Võ Trần Bảo Nguyên - MSSV: 20110138
2. Trần Văn Dân - MSSV: 20110451

## Cách chạy project trên Local
Link video hướng dẫn: https://youtu.be/d1uwv39nU0o

## Cách deploy project trên AWS sử dụng Amazon S3
Link video hướng dẫn: https://youtu.be/i7wWo8rnAUo

### 1. Chuẩn bị Database và Back-End
- **Bước 1:** Clone dự án về bằng link sau: https://github.com/votranbaonguyen/DTDM_Detai11.git
- **Bước 2:** Tạo sẵn bảng UserTable trong DynamoDB (Tạo trước một Record với dữ liệu như hình)
![Untitled](https://user-images.githubusercontent.com/112375064/205549132-9d569dd6-19f8-4281-9f70-36396b10bbab.png)

- **Bước 3:** Thực hiện tạo Lambda Function CreateTable
- **Bước 3.1:** Trên AWS chọn Search, nhập **“Lambda”**  rồi chọn chức năng Lambda ta được như hình sau:
![image](https://user-images.githubusercontent.com/74422751/205604485-6f5cac71-5dbf-4ccf-8a35-e2866ead4bc9.png)
- **Bước 3.2:** Chọn **Create function**, ta bắt đầu tạo function: </br>
Chọn **Author from scratch** </br>
Nhập **Function name** </br>
**Runtime** chọn **Node.js 18.x** </br>
Ở **Architecture** chọn **x86_64** </br>
Mở **Change default execution role** </br>
Chọn **Use an existing role** </br>
Ở **Existing role chọn LabRole** </br>
Mở **Advanced Settings** </br>
Chọn **Enable function URL** </br>
Ở **Auth type** chọn **None** </br>
Chọn **Configure cross-origin resource sharing (CORS)** </br>
Cuối cùng chọn **Create function** </br>
Ta được kết quả như hình sau: </br>
![image](https://user-images.githubusercontent.com/74422751/205606645-92090ebf-44a8-410a-b5f9-442d990236c9.png) </br>
Lưu lại **Function URL** để sử dụng cho **Front-end**
- **Bước 3.3**: Ở phần **Code**, ta chọn file **index.mjs**, và paste **source code** của chức năng **CreateTable** vào. Lưu ý, **source code** của **CreateTable** được lưu tại thư mục backend/lambda_nodejs, trong đó ta sẽ thấy file CreateTable.txt chứa **source code** của **CreateTable**, các **REGION** hoặc **DEFAULT_REGION** trong **source code** ta thay bằng **Region** bạn mong muốn (có thể là vùng hiện tại của bạn), hiện tại là **"us-east-1"**
- **Bước 4:** Thực hiện tạo các Lambda Funtion URL còn lại với cách làm tương tự như **Bước 3**
### 2. Chuẩn bị Front-End
- **Bước 1:** Vào thư mục frontend/src/services/ mở file api.js lên bằng các phần mềm chuyên dụng để viết code, ở đây ta thực hiện dán các Function Url đã tạo ở bước trên tương ứng với tên của mỗi Function vào
![Untitled](https://user-images.githubusercontent.com/112375064/205549485-bd3a76b6-c0cf-4ee0-a796-286205a71ea3.png)

- **Bước 2:** Cài đặt NodeJS vào máy tính nếu chưa có, có thể tham khảo link sau: https://nodejs.org/en/ (Lưu ý: Luôn ưu tiên tải và cài đặt bản LTS)
- **Bước 3:** Thực hiện mở terminal tại thư mục frontend và chạy các dòng lệnh sau: </br>
 *npm i* (Dùng để cài đặt node_module và các thư viện cần thiết) </br>
 *npm start* (Dùng để chạy web ở local) </br>

- **Bước 4:** Nếu web không tự động mở lên ta có thể dùng đường dẫn http://localhost:3000/ để mở trang web. Giao diện login sẽ được bật ra, ở đây ta dùng dữ liệu đã tạo ở  bước 2 với UserID là 1, UserName là US1 và Password là pw1 để đăng nhập. Sau khi đăng nhập thành công ta có thể sử dụng các chức năng của web
![Untitled](https://user-images.githubusercontent.com/112375064/205550153-2c932909-fb69-44a0-9730-dc08b9e69db7.png)

## Giao diện trang web
### Giao diện phần xem tất cả các bảng
![Untitled](https://user-images.githubusercontent.com/112375064/205550324-5c4b0ade-99d6-4aae-afc8-ebd96e334f3a.png)

### Giao diện phần tạo bảng
![Untitled](https://user-images.githubusercontent.com/112375064/205550386-ddbb5928-0c61-4338-a85c-78fc41cf82ed.png)

### Giao Diện phần xem tất cả Record trong bảng
![Untitled](https://user-images.githubusercontent.com/112375064/205550499-bd71a081-de52-44d3-a938-df991891a9ca.png)

### Giao Diện phần tạo Record
![Untitled](https://user-images.githubusercontent.com/112375064/205550603-cbd90033-8e27-4d95-b2d8-34fb237d2d57.png)

### Giao diện phần sửa Record
![Untitled](https://user-images.githubusercontent.com/112375064/205550716-89e1bd33-4c9b-455b-b652-8be63d0ba4a9.png)


