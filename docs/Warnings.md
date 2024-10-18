---
id: warnings
---

# 경고

다음은 NextAuth.js에서 발생하는 경고 목록입니다.

모든 경고는 확인해야 할 사항을 나타내지만 정상적인 작동을 방해하지는 않습니다.

---

## 클라이언트

#### NEXTAUTH_URL

환경 변수 `NEXTAUTH_URL`이 누락되었습니다. `.env` 파일에 설정해 주세요.

**참고**  
[Vercel](https://vercel.com/) 배포에서는 `VERCEL_URL` 환경 변수를 읽으므로 `NEXTAUTH_URL`을 정의할 필요가 없습니다.

---

## 서버

이 경고는 터미널에 표시됩니다.

#### NO_SECRET

개발 중에는 편의를 위해 구성에 따라 `secret`이 생성됩니다. 이는 휘발성이며 프로덕션에서는 오류를 발생시킵니다. [자세히 알아보기](https://next-auth.js.org/configuration/options#secret)

#### TWITTER_OAUTH_2_BETA

Twitter OAuth 2.0은 현재 베타 상태이며, 특정 변경이 필요할 수 있습니다. 이는 세맨틱 버전 관리의 적용을 받지 않습니다. 문서 [여기](https://next-auth.js.org/providers/twitter#oauth-2)를 참조하세요.

#### EXPERIMENTAL_API

일부 API는 여전히 실험적이며, 향후 변경되거나 제거될 수 있습니다. 사용 시 주의하세요.

#### DEBUG_ENABLED

`debug` 옵션이 활성화되었습니다. 이는 개발 전용으로, 인증 흐름의 문제를 포착하는 데 도움을 주며, 프로덕션 배포 시 이 옵션을 제거하는 것이 좋습니다. `debug: process.env.NODE_ENV !== "production"`과 같이 설정하여 프로덕션에서만 디버깅을 허용할 수 있습니다. 이를 통해 값을 변경할 필요 없이 커밋할 수 있습니다.

프로덕션에서 디버그 메시지를 기록하려면 잠재적으로 민감한 사용자 정보를 적절히 위생 처리하는 [`logger` 옵션](https://next-auth.js.org/configuration/options#logger)을 설정하는 것을 권장합니다.

## 어댑터

### ADAPTER_TYPEORM_UPDATING_ENTITIES

이 경고는 TypeORM이 제공된 엔티티가 데이터베이스 엔티티와 다름을 감지할 때 발생합니다. 기본적으로 프로덕션이 아닐 때 TypeORM 어댑터는 엔티티 코드 파일에 대한 변경 사항을 항상 동기화합니다.

이 경고를 비활성화하려면 TypeORM 구성에서 `synchronize: false`로 설정하세요.

예시:

```javascript
adapter: TypeORMLegacyAdapter({
  type: 'mysql',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  synchronize: false
}),
```