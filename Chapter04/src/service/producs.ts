export function getProducts() {
  return ['shirts', 'pants', 'skirt', 'shoes', 'dress'];
}

export function getProduct(id: string) {
  return 'shirts';
}

// 여러 페이지에서 공통으로 사용하는 데이터있기 때문에 함수로 정의해준 것
