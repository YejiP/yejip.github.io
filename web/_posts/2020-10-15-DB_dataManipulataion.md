```sql
select * from employees e, departments d
order by EMPLOYEE_ID; --카르테시안 조인
```

이렇게 하면 107*27의 결과가 나온다. 우리가 원하는게 아니다.

# TABLE JOIN

두 테이블이 PK, FK 의 관계를 가지고 있으면 join을 할 수 있다.

```SQL
select first_name ,salary from employees; -- eid(pk), did(fk), 자 다
select department_name from departments; -- did(pk), 부
select first_name, department_name , salary
from employees e, departments d
where d.department_id = e.department_id;-- 이 문장이 빠지면 카르테시안 조인이 나온다. 
```



## EQUI JOIN

```sql
--부서명 주소를 조회하는 쿼리를 작성
select d.DEPARTMENT_NAME,l.STREET_ADDRESS || l.CITY || ' ' || l.STATE_PROVINCE  ADDRESS from departments d, locations l
where d.location_id = l.location_id;
```

```sql
--부서명, 부서장 이름을 조회하는 쿼리를 작성
select d.DEPARTMENT_NAME || ' 의 팀장은' || e.first_name  || ' 입니다.' AS "MANAGER OF EACH DEPARTMENT" from departments d, employees e
where e.employee_id = d.manager_id;
```



## NOT EQUI JOIN



## SELF JOIN

같은 표에서 조인한는 것.

```SQL
--사원명, 매니저명
SELECT E1.FIRST_NAME || ' 사원의 매니저는 ' || E2.FIRST_NAME || ' 입니다.' as manager
FROM EMPLOYEES E1,  EMPLOYEES E2
WHERE E1.MANAGER_ID = E2.EMPLOYEE_ID(+)
order by E1.FIRST_NAME;
```



## OUTER JOIN

셋째줄 **WHERE E1.MANAGER_ID = E2.EMPLOYEE_ID(+)** 

```SQL
--사원명, 매니저명
SELECT E1.FIRST_NAME || ' 사원의 매니저는 ' || E2.FIRST_NAME || ' 입니다.' as manager
FROM EMPLOYEES E1,  EMPLOYEES E2
WHERE E1.MANAGER_ID = E2.EMPLOYEE_ID(+) --(+)표시는, NULL일때도 출력해달라는 뜻.
order by E1.FIRST_NAME;
```



```SQL
select first_name, department_name , salary
from employees e, departments d
where d.department_id(+) = e.department_id; -- RIGHT JOIN
--기준이 되는 쪽 RIGHT 이라서 RIGHT JOIN, 그리고 그걸 기준으로 왼쪽을 붙여준다. 그래서 E.DEPARTMENT_ID가 NULL 인 애들도 그대로 나온다.  아니라 반대쪽에 (+)를 붙여준다. 
```



```sql
--department , location, country
select d.department_name, l.street_address, c.country_name from departments d, locations l , countries c
where (d.LOCATION_ID = l.LOCATION_ID) and (l.COUNTRY_ID=c.COUNTRY_ID);

```



## INNER JOIN