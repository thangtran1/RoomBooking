import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Select, InputReadOnly } from "../components";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../services";
import { useSelector } from "react-redux";

const Address = forwardRef(
  ({ setPayload, invalidFields, setInvalidFields }, ref) => {
    const { dataEdit } = useSelector((state) => state.post);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [reset, setReset] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setProvince("");
        setDistrict("");
        setReset(true);
      },
    }));

    useEffect(() => {
      if (dataEdit) {
        let addressArr = dataEdit?.address?.split(",");
        let foundProvince =
          provinces?.length > 0 &&
          provinces?.find(
            (item) =>
              item.province_name === addressArr[addressArr?.length - 1]?.trim()
          );
        setProvince(foundProvince ? foundProvince.province_id : "");
      }
    }, [provinces, dataEdit]);

    useEffect(() => {
      if (dataEdit) {
        let addressArr = dataEdit?.address?.split(",");
        let foundDistrict =
          districts?.length > 0 &&
          districts?.find(
            (item) =>
              item.district_name === addressArr[addressArr.length - 2]?.trim()
          );
        setDistrict(foundDistrict ? foundDistrict.district_id : "");
      }
    }, [districts, dataEdit]);

    useEffect(() => {
      const fetchPublicProvince = async () => {
        const response = await apiGetPublicProvinces();
        if (response.status === 200) {
          const mapped = response.data.map((item) => ({
            province_id: item.code.toString(),
            province_name: item.name,
          }));
          setProvinces(mapped);
        }
      };
      fetchPublicProvince();
    }, []);

    useEffect(() => {
      setDistrict("");
      const fetchPublicDistrict = async () => {
        try {
          const response = await apiGetPublicDistrict(province);
          if (response.status === 200) {
            const mappedDistricts = (response.data.districts || []).map(
              (item) => ({
                district_id: item.code.toString(),
                district_name: item.name,
              })
            );
            setDistricts(mappedDistricts);
          }
        } catch (error) {
          console.error("Lỗi lấy quận/huyện:", error);
          setDistricts([]);
        }
      };

      if (province) {
        fetchPublicDistrict();
        setReset(false);
      } else {
        setReset(true);
        setDistricts([]);
      }
    }, [province]);

    useEffect(() => {
      setPayload((prev) => ({
        ...prev,
        address: `${
          district
            ? `${
                districts?.find((item) => item.district_id === district)
                  ?.district_name
              }, `
            : ""
        }${
          province
            ? provinces?.find((item) => item.province_id === province)
                ?.province_name
            : ""
        }`,
        province: province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : "",
      }));
    }, [district, districts, province, provinces, setPayload]);

    return (
      <div>
        <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Select
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              type="province"
              value={province}
              setValue={setProvince}
              options={provinces}
              label="Tỉnh/Thành phố"
            />
            <Select
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              reset={reset}
              type="district"
              value={district}
              setValue={setDistrict}
              options={districts}
              label="Quận/Huyện"
            />
          </div>
          <div>
            <InputReadOnly
              label="Địa chỉ chính xác"
              value={`${
                district
                  ? `${
                      districts?.find((item) => item.district_id === district)
                        ?.district_name
                    }, `
                  : ""
              } ${
                province
                  ? provinces?.find((item) => item.province_id === province)
                      ?.province_name
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default memo(Address);
