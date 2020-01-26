#!/usr/bin/env bash

fe_template_build() {
  set -ex

  echo "[`date "+%Y-%m-%d %H:%M:%S"`]"

  # 拿到当前目录，用于本脚本执行完后回到原点
  current_dir=`pwd`

  # node版本信息
  node -v

  ####
  ## 变量定义
  ####

  frame_name=$(node -e "var name = require('./package.json').name; name[0] === '@' ? console.log(name.split('/')[0]) : console.log(name.split('-')[1])")
  product_line=$frame_name

  name=$(node -e "var name = require('./package.json').name; name[0] === '@' ? console.log(name.split('/')[0]) : console.log(name.split('-').slice(2).join('-'))")
  product_name=$name

  # 三位打包版本号，如（1.1.0）
  get_version() {
    node -e "console.log(require('./package.json').version)"
  }
  version=$(get_version)
  # 产品的第四位版本号，如（663）
  build_version=${BUILD_NUMBER}
  # 产品tar包和zip包存放的文件夹，如（/app/jenkins_pkg/front/glab/wifi）
  pkg=$front_pkg_path/$frame_name/$name
  # 当前打包产品和版本文件夹名，如（wifi-1.1.0.663）
  file_name=$name-$version.$build_version
  # 当前大版本的tar包和zip包存放文件夹，如（/app/jenkins_pkg/front/glab/wifi/1.1.0/wifi-1.1.0.663）
  out_path=$pkg/$version/$file_name

  ####
  ## 主流程开始
  ####

  #### 前端构建部分

  # 初始化项目
  rm -rf node_modules
  npm install --unsafe-perm=true

  # build项目为dist
  echo "[`date "+%Y-%m-%d %H:%M:%S"`]"
  rm -rf dist $out_path
  npm run build
  

  # 建立输出文件夹
  mkdir -p $pkg/$version

  # dist文件复制到输出文件夹
  mv dist $out_path

  # 复写version文件，如（xxx/wifi/version）
  echo $version>$pkg/version
  # 复写build_version文件，如（xxx/wifi/1.1.0/build_version）
  echo $build_version>$pkg/$version/build_version
  # dist输出文件夹添加version文件，如（xxx/wifi/1.1.0/version）用于每次上线后http://xxx/version查看是否部署了正确版本
  echo $version.$build_version>$out_path/version

  echo "[`date "+%Y-%m-%d %H:%M:%S"`]"

  # dist输出文件夹权限修改
  chmod -R 755 $out_path/

  # 压缩dist/成tar包和zip包
  cd $pkg/$version
  rm -rf $file_name.zip $file_name.tar.gz
  zip -r $file_name.zip $file_name
  tar -zcvf $file_name.tar.gz $file_name

  # 删除dist输出文件夹
  rm -rf $out_path

  # 保存本次打包的版本信息
  echo $version.$build_version>$builder_shell_path/vue-group/projects/$name.txt

  # 回到执行的原始目录
  cd $current_dir

  #### docker构建部分

  echo "[`date "+%Y-%m-%d %H:%M:%S"`]"


  # docker版本号
  VERSION=$version.$build_version
  # 镜像名称
  IMAGE_NAME="fe/$frame_name/$product_name"

  echo "[`date "+%Y-%m-%d %H:%M:%S"`]"

  # 删除原有dockerfile
  rm -rf Dockerfile
  # 添加内容
  echo "FROM plat/gorp/fe:alpine" >> Dockerfile
  echo "FROM plat/gorp/fe:alpine-aarch64" >> aarch64.Dockerfile
  echo "RUN front_install http://$BUILDPKG_REGISTRY/front/$frame_name/$name/$version/$name-$VERSION.tar.gz unionindex" >> Dockerfile
  echo "RUN front_install http://$BUILDPKG_REGISTRY/front/$frame_name/$name/$version/$name-$VERSION.tar.gz unionindex" >> aarch64.Dockerfile

  echo "[`date "+%Y-%m-%d %H:%M:%S"`]"

  # 构建docker
  docker build -t $IMAGE_NAME:$VERSION-aarch64 -f aarch64.Dockerfile .
  docker build -t $IMAGE_NAME:$VERSION .

  mkdir -p _output
  echo $IMAGE_NAME:$VERSION > _output/image.txt

  # 发布
  docker_publish() {
      IMAGE="$1"
      docker tag $IMAGE $DOCKER_REGISTRY/$IMAGE
      docker tag $IMAGE-aarch64 $DOCKER_REGISTRY/$IMAGE-aarch64
      docker push $DOCKER_REGISTRY/$IMAGE
      docker push $DOCKER_REGISTRY/$IMAGE-aarch64
      echo "$DOCKER_REGISTRY/$IMAGE"
  }

  docker_publish $IMAGE_NAME:$VERSION

  OUTPUT_DIR="${front_pkg_path}/docker/docker-image-${product_line}_${product_name}/$VERSION"
  mkdir -p $OUTPUT_DIR

  cp -rf _output/* $OUTPUT_DIR

  mkdir -p output
  echo $VERSION > output/version
}

fe_template_build
